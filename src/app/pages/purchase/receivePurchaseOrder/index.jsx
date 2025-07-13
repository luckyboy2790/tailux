import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CoverImageUpload } from "./components/CoverImageUpload";

// Local Imports
import useValidationSchema from "./schema";
import { Page } from "components/shared/Page";
import { Button, GhostSpinner, Input, Textarea } from "components/ui";
import { OrderItemsTable } from "./components/OrderItemsTable";
import { Combobox } from "components/shared/form/Combobox";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useAuthContext } from "app/contexts/auth/context";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AddPurchaseOrder = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [stores, setStores] = useState([]);

  const [filterValue, setFilterValue] = useState("");

  const { id } = useParams();

  const [cookie] = useCookies();

  const token = cookie.authToken;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(useValidationSchema()),
    defaultValues: {
      orders: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = methods;

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const storeRes = await fetch(`${API_URL}/api/store/get_stores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const storeResult = await storeRes.json();
      let storeData = [
        { key: -1, value: "", label: t("nav.select.select_store") },
        ...(storeResult?.data?.map((item, key) => ({
          key,
          value: item?.id,
          label: item?.name,
        })) ?? []),
      ];

      if (user?.role === "user" || user?.role === "secretary") {
        storeData = storeData.filter(
          (item) => item.value === Number(user.first_store_id),
        );
      }

      setStores(storeData);

      const res = await fetch(
        `${API_URL}/api/purchase_order/get_detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok) return;

      const data = result.data;

      const mappedOrders = data.orders
        .filter(
          (item) => Number(item?.quantity) > Number(item?.received_quantity),
        )
        .filter((item) =>
          item.product.toLowerCase().includes(filterValue.toLowerCase()),
        )
        .map((item) => ({
          id: item.id,
          product_name: item.product,
          product_cost: item.cost,
          quantity: item.quantity,
          discount: item.discount_string,
          category: item.category_name,
          receive_quantity: item.received_quantity,
          balance: Number(item.quantity) - Number(item.received_quantity),
          receive: Number(item.quantity) - Number(item.received_quantity),
          checked: false,
          images: item.images,
        }));

      setOrders(mappedOrders);

      if (user.role !== "admin") {
        reset({
          store_id: user?.first_store_id || -1,
        });
      }
    };
    fetchData();
  }, [t, id, token, reset, user, filterValue]);

  const onSubmit = async (formData) => {
    setIsLoading(true);

    if (orders.filter((item) => item.checked === true).length <= 0) {
      toast.error(t("nav.purchase.select_order_item_message"));

      setIsLoading(false);

      return;
    }

    const payload = {
      id,
      reference_no: formData.reference_no,
      store: Number(formData.store_id),
      shipping_carrier: formData.shipping_carrier,
      attachment: formData.attachment,
      items: orders
        .filter((o) => o.checked)
        .map((o) => ({
          id: o.id,
          product_name: o.product_name || "",
          product_cost: o.product_cost,
          quantity: o.quantity,
          receive: o.receive,
          discount: o.discount,
          category: o.category,
        })),
      items_json: JSON.stringify(
        orders
          .filter((o) => o.checked)
          .map((o) => ({
            id: o.id,
            product_name: o.product_name || "",
            product_cost: o.product_cost,
            quantity: o.quantity,
            receive: o.receive,
            discount: o.discount,
            category: o.category,
          })),
      ),
      total_amount: orders
        .filter((o) => o.checked)
        .reduce((sum, o) => {
          const cost = Number(o.product_cost) || 0;
          const qty = Number(o.receive) || 0;
          const discount = o.discount || 0;

          let discountAmount = 0;
          if (typeof discount === "string" && discount.trim().endsWith("%")) {
            const percent = parseFloat(discount.trim().replace("%", ""));
            if (!isNaN(percent)) discountAmount = (cost * percent) / 100;
          } else {
            const flat = Number(discount);
            if (!isNaN(flat)) discountAmount = flat;
          }
          const subtotal = (cost - discountAmount).toFixed() * qty;

          return sum + subtotal;
        }, 0),
      note: formData.note || "",
      status: 1,
    };

    try {
      if (isLoading) return;

      const form = new FormData();
      for (const key in payload) {
        if (key === "items" || key === "items_json") {
          form.append(key, payload[key]);
        } else {
          form.append(key, payload[key] ?? "");
        }
      }

      orders.forEach((order, i) => {
        if (order.image?.length) {
          order.image.forEach((file) => {
            form.append(`images[${i}][]`, file);
          });
        }
      });

      if (formData.attachment?.length) {
        for (let i = 0; i < formData.attachment.length; i++) {
          form.append("attachment", formData.attachment[i]);
        }
      }

      const res = await fetch(`${API_URL}/api/purchase_order/receive`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong");

      navigate("/received-order/list");
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page title="New Post Form">
      <div className="transition-content px-(--margin-x) pb-6">
        <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
          <div className="flex items-center gap-1">
            <DocumentPlusIcon className="size-6" />
            <h2 className="dark:text-dark-50 text-xl font-medium text-gray-700">
              {t("nav.purchase.receive_purchase_order")}
            </h2>
          </div>
          <Button
            className="min-w-[7rem]"
            color="primary"
            type="submit"
            form="new-post-form"
          >
            {isLoading ? (
              <>
                <GhostSpinner variant="soft" className="size-4 border-2" />
              </>
            ) : (
              <>{t("nav.purchase.save")}</>
            )}
          </Button>
        </div>

        <FormProvider {...methods}>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            id="new-post-form"
          >
            <div className="w-full">
              <div className="col-span-12 lg:col-span-8">
                <div className="mt-5 space-y-5">
                  <OrderItemsTable
                    orders={orders}
                    setOrders={setOrders}
                    watch={watch}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                  />
                </div>

                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                    <Input
                      label={t("nav.purchase.reference_no")}
                      placeholder={t("nav.purchase.reference_no")}
                      {...register("reference_no")}
                      error={errors?.reference_no?.message}
                    />

                    <Controller
                      name="store_id"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Combobox
                          label={t("nav.purchase.store")}
                          data={stores}
                          value={
                            stores.find((s) => {
                              return s.value === value;
                            }) || null
                          }
                          onChange={(selected) =>
                            onChange(selected?.value || "")
                          }
                          placeholder={t("nav.select.select_store")}
                          displayField="label"
                          searchFields={["label"]}
                          error={error?.message}
                          disabled={user?.role !== "admin"}
                        />
                      )}
                    />

                    <Controller
                      name="attachment"
                      control={control}
                      render={({ field }) => (
                        <CoverImageUpload
                          label={t("nav.purchase.attachment")}
                          error={errors?.attachment?.message}
                          {...field}
                        />
                      )}
                    />

                    <Input
                      label={t("nav.purchase.shipping_carrier")}
                      placeholder={t("nav.purchase.shipping_carrier")}
                      {...register("shipping_carrier")}
                      error={errors?.shipping_carrier?.message}
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  <Textarea
                    label={t("nav.purchase.note")}
                    rows="5"
                    {...register("note")}
                    error={errors?.note?.message}
                  />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Page>
  );
};

export default AddPurchaseOrder;
