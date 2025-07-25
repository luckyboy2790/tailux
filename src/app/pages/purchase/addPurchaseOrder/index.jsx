import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

// Local Imports
import useValidationSchema from "./schema";
import { Page } from "components/shared/Page";
import { Button, GhostSpinner, Input, Textarea } from "components/ui";
import { CoverImageUpload } from "./components/CoverImageUpload";
import { DatePicker } from "components/shared/form/Datepicker";
import { OrderItemsTable } from "./components/OrderItemsTable";
import { useNavigate } from "react-router";
import { Combobox } from "components/shared/form/Combobox";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import clsx from "clsx";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  reference_no: "",
  supplier_id: "",
  discount: "0",
  attachment: [],
  note: "",
};

// const initialData = [
//   {
//     product_name: "",
//     product_cost: 0,
//     quantity: 0,
//     discount: "",
//     image: [],
//     category_id: "",
//     subTotal: "",
//   },
// ];

const AddPurchaseOrder = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const [cookie] = useCookies();

  const token = cookie.authToken;

  const [isLoading, setIsLoading] = useState(false);

  const [enableFullScreen, setEnableFullScreen] = useState(false);

  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(useValidationSchema()),
    defaultValues: {
      ...initialState,
      orders: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = methods;

  useEffect(() => {
    const fetchData = async () => {
      const supplierRes = await fetch(
        `${API_URL}/api/supplier/get_all_suppliers`,
      );
      const supplierResult = await supplierRes.json();
      const supplierData = [
        { key: -1, value: "", label: "" },
        ...(supplierResult?.data?.map((item, key) => ({
          key,
          value: item?.id,
          label: item?.name,
        })) ?? []),
      ];
      setSupplier(supplierData);
    };
    fetchData();
  }, [t]);

  const onSubmit = async (formData) => {
    setIsLoading(true);

    // ✅ Validation per item
    const invalidItemIndex = orders.findIndex((o) => {
      const nameValid = o.product_name?.trim();
      const costValid = Number(o.product_cost) > 0;
      const categoryValid = o.category !== "";
      return !(nameValid && costValid && categoryValid);
    });

    if (invalidItemIndex !== -1) {
      toast.error(
        `${t("nav.purchase.invalid_row_message") || "Invalid item data"} (#${invalidItemIndex + 1})`,
      );
      setIsLoading(false);
      return;
    }

    const payload = {
      id: "",
      date: formData.purchase_date,
      reference_no: formData.reference_no,
      supplier: Number(formData.supplier_id),
      discount: formData.discount,
      items: orders.map((o) => ({
        product_name: o.product_name || "",
        product_cost: o.product_cost,
        quantity: o.quantity,
        discount: o.discount,
        image: o.image,
        category: o.category,
      })),
      items_json: JSON.stringify(
        orders.map((o) => ({
          product_name: o.product_name || "",
          product_cost: o.product_cost,
          quantity: o.quantity,
          discount: o.discount,
          image: o.image,
          category: o.category,
        })),
      ),
      discount_string: formData.discount.toString(),
      total_amount: orders.reduce((sum, o) => {
        const cost = Number(o.product_cost) || 0;
        const qty = Number(o.quantity) || 0;
        const discount = o.discount || 0;

        let discountAmount = 0;
        if (typeof discount === "string" && discount.trim().endsWith("%")) {
          const percent = parseFloat(discount.trim().replace("%", ""));
          if (!isNaN(percent)) discountAmount = (cost * percent) / 100;
        } else {
          const flat = Number(discount);
          if (!isNaN(flat)) discountAmount = flat;
        }

        const subtotal = (cost - discountAmount) * qty;
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

      const res = await fetch(`${API_URL}/api/purchase_order/create`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong");

      navigate("/purchase-order/list");
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page title="New Post Form">
      <div
        className={clsx(
          "transition-content pb-6",
          enableFullScreen
            ? "dark:bg-dark-900 fixed inset-0 z-50 overflow-y-auto bg-white px-4 pt-6 sm:px-5"
            : "px-(--margin-x)",
        )}
      >
        <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
          <div className="flex items-center gap-1">
            <DocumentPlusIcon className="size-6" />
            <h2 className="dark:text-dark-50 text-xl font-medium text-gray-700">
              {t("nav.purchase.add_purchase_order")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="min-w-[7rem]"
              variant="outlined"
              onClick={() => setEnableFullScreen((prev) => !prev)}
            >
              {enableFullScreen
                ? t("nav.view.exit_full_screen")
                : t("nav.view.full_screen")}
            </Button>
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    <Controller
                      name="purchase_date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          onChange={(val) =>
                            field.onChange(dayjs(val).format("YYYY-MM-DD"))
                          }
                          value={field.value || ""}
                          label={t("nav.purchase.purchase_date")}
                          error={errors?.purchase_date?.message}
                          placeholder={t(
                            "nav.purchase.purchase_date_placeholder",
                          )}
                        />
                      )}
                    />

                    <Input
                      label={t("nav.purchase.reference_no")}
                      placeholder={t("nav.purchase.reference_no")}
                      {...register("reference_no")}
                      error={errors?.reference_no?.message}
                    />

                    <Controller
                      name="supplier_id"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Combobox
                          label={t("nav.purchase.supplier")}
                          data={supplier}
                          value={
                            supplier.find((s) => s.value === value) || null
                          }
                          onChange={(selected) =>
                            onChange(selected?.value || "")
                          }
                          placeholder={t("nav.select.select_supplier")}
                          displayField="label"
                          searchFields={["label"]}
                          error={error?.message}
                        />
                      )}
                    />

                    <Input
                      label={t("nav.purchase.discount")}
                      {...register("discount")}
                      placeholder={t("nav.purchase.discount")}
                      error={errors?.discount?.message}
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
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  <OrderItemsTable
                    orders={orders}
                    setOrders={setOrders}
                    watch={watch}
                  />
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
