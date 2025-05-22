import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

// Local Imports
import useValidationSchema from "./schema";
import { Page } from "components/shared/Page";
import {
  Button,
  Card,
  GhostSpinner,
  Input,
  Select,
  Textarea,
} from "components/ui";
import { Delta } from "components/shared/form/TextEditor";
import { CoverImageUpload } from "./components/CoverImageUpload";
import { DatePicker } from "components/shared/form/Datepicker";
import { OrderItemsTable } from "./components/OrderItemsTable";
import { useNavigate } from "react-router";
import { Combobox } from "components/shared/form/Combobox";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  title: "",
  caption: "",
  content: new Delta(),
  cover: null,
  category_id: "",
  author_id: "",
  tags: [],
  publish_date: "",
  reference_no: "",
  store: "",
  supplier_id: "",
  day_of_credit: 0,
  attachment: [],
  discount: 0,
  shipping: 0,
  returns: 0,
  note: "",
};

const initialData = [
  {
    product_name: "",
    expiry_date: "",
    product_cost: 0,
    quantity: 0,
  },
];

const AddPurchase = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState(initialData);
  const [stores, setStores] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const [cookie] = useCookies();

  const token = cookie.authToken;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(useValidationSchema()),
    defaultValues: {
      ...initialState,
      orders: initialData,
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
      const storeRes = await fetch(`${API_URL}/api/store/get_stores`);
      const storeResult = await storeRes.json();
      const storeData = [
        { key: -1, value: "", label: t("nav.select.select_store") },
        ...(storeResult?.data?.map((item, key) => ({
          key,
          value: item?.id,
          label: item?.name,
        })) ?? []),
      ];
      setStores(storeData);

      const supplierRes = await fetch(
        `${API_URL}/api/supplier/get_all_suppliers`,
      );
      const supplierResult = await supplierRes.json();
      const supplierData = [
        { key: -1, value: "", label: t("nav.select.select_supplier") },
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

    const payload = {
      id: "",
      date: formData.purchase_date,
      reference_no: formData.reference_no,
      store: Number(formData.store),
      supplier: Number(formData.supplier_id),
      credit_days: formData.day_of_credit.toString(),
      orders: orders.map((o) => ({
        product: o.product_name || "",
        product_id: o.product_id || 1,
        cost: o.product_cost,
        quantity: o.quantity,
        expiry_date: o.expiry_date || "",
      })),
      orders_json: JSON.stringify(
        orders.map((o) => ({
          product: o.product_name || "",
          product_id: o.product_id || 1,
          cost: o.product_cost,
          quantity: o.quantity,
          expiry_date: o.expiry_date || "",
        })),
      ),
      discount: formData.discount,
      discount_string: formData.discount.toString(),
      shipping: formData.shipping,
      shipping_string: formData.shipping.toString(),
      returns: formData.returns,
      grand_total: orders.reduce(
        (sum, o) => sum + Number(o.product_cost || 0) * Number(o.quantity || 1),
        0,
      ),
      note: formData.note || "",
      status: 1,
    };

    try {
      if (isLoading) return;

      const form = new FormData();
      for (const key in payload) {
        if (key === "orders" || key === "orders_json") {
          form.append(key, payload[key]);
        } else {
          form.append(key, payload[key] ?? "");
        }
      }

      if (formData.attachment?.length) {
        for (let i = 0; i < formData.attachment.length; i++) {
          form.append("attachment", formData.attachment[i]);
        }
      }

      const res = await fetch(`${API_URL}/api/purchase/create`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong");

      navigate("/purchase/list");
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
              {t("nav.purchase.add_purchase")}
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
                <Card className="p-4 sm:px-5">
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

                      <Select
                        label={t("nav.purchase.store")}
                        data={stores}
                        {...register("store")}
                        error={errors?.store?.message}
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
                        label={t("nav.purchase.days_of_credit")}
                        type="number"
                        {...register("day_of_credit")}
                        error={errors?.day_of_credit?.message}
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                      <Input
                        label={t("nav.purchase.discount")}
                        type="number"
                        {...register("discount")}
                        error={errors?.discount?.message}
                      />
                      <Input
                        label={t("nav.purchase.shipping")}
                        type="number"
                        {...register("shipping")}
                        error={errors?.shipping?.message}
                      />
                      <Input
                        label={t("nav.purchase.return")}
                        type="number"
                        {...register("returns")}
                        error={errors?.returns?.message}
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
                </Card>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Page>
  );
};

export default AddPurchase;
