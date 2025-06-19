import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
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
import { Combobox } from "components/shared/form/Combobox";
import { useCookies } from "react-cookie";
import { Image } from "antd";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMG_URL = import.meta.env.VITE_IMAGE_URL;

const initialData = [
  {
    product_name: "",
    expiry_date: "",
    product_cost: 0,
    quantity: 0,
  },
];

const EditPurchase = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [orders, setOrders] = useState(initialData);
  const [stores, setStores] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const [cookie] = useCookies();

  const token = cookie.authToken;

  const [isLoading, setIsLoading] = useState(false);

  const [imageEditable, setImageEditable] = useState(false);
  const [images, setImages] = useState([]);

  const methods = useForm({
    resolver: yupResolver(useValidationSchema()),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = methods;

  useEffect(() => {
    const init = async () => {
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

      if (!id) return;

      const res = await fetch(
        `${API_URL}/api/purchase/get_detail?purchaseId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      if (!res.ok) return;

      const data = result.data;
      const mappedOrders =
        data.orders.map((item) => ({
          product_name: item.product_id,
          expiry_date: item.expiry_date,
          product_cost: item.cost,
          quantity: item.quantity,
        })) || initialData;

      const imagePaths =
        data.images?.map((img) => img.path.split("/").pop()) || [];
      setImages(data.images?.map((img) => img.path)) || [];

      reset({
        title: data.title || "",
        caption: data.caption || "",
        content: new Delta(data.content || {}),
        cover: data.cover || null,
        category_id: data.category_id || "",
        author_id: data.author_id || "",
        tags: data.tags || [],
        publish_date: data.publish_date || "",
        purchase_date: dayjs(data.timestamp).format("YYYY-MM-DD"),
        reference_no: data.reference_no || "",
        store: data.store_id?.toString() || "",
        supplier_id: data.supplier_id?.toString() || "",
        day_of_credit: Number(data.credit_days) || 0,
        attachment: imagePaths,
        discount: Number(data.discount) || 0,
        shipping: Number(data.shipping_string) || 0,
        returns: Number(data.returns) || 0,
        note: data.note || "",
      });

      setOrders(mappedOrders);
    };

    init();
  }, [id, reset, t, token]);

  const onSubmit = async (formData) => {
    setIsLoading(true);

    const payload = {
      id,
      imageEditable: imageEditable,
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
        form.append(key, payload[key] ?? "");
      }
      if (formData.attachment?.length) {
        for (let i = 0; i < formData.attachment.length; i++) {
          form.append("attachment", formData.attachment[i]);
        }
      }

      const res = await fetch(`${API_URL}/api/purchase/update`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");

      window.history.back();
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
              {t("nav.purchase.update_purchase")}
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
                            supplier.find(
                              (s) => s.value?.toString() === value,
                            ) || null
                          }
                          onChange={(selected) =>
                            onChange(selected?.value || "")
                          }
                          placeholder="Select supplier"
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
                    <div className="flex flex-col gap-2.5">
                      <Controller
                        name="attachment"
                        control={control}
                        render={({ field }) => (
                          <CoverImageUpload
                            label={t("nav.purchase.attachment")}
                            error={errors?.attachment?.message}
                            {...field}
                            onChange={(files) => {
                              setImageEditable(true);
                              field.onChange(files);
                            }}
                          />
                        )}
                      />
                      <div className="flex gap-1">
                        {!imageEditable &&
                          images.map((item, index) => (
                            <Image
                              key={index}
                              width={45}
                              height={45}
                              src={`${IMG_URL}${item}`}
                            />
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-5">
                    <OrderItemsTable
                      orders={orders}
                      setOrders={setOrders}
                      watch={watch}
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    <Controller
                      name="discount"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label={t("nav.purchase.discount")}
                          type="text"
                          value={(field.value || 0).toLocaleString()}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            );
                            field.onChange(rawValue ? Number(rawValue) : 0);
                          }}
                          error={errors?.discount?.message}
                        />
                      )}
                    />

                    <Controller
                      name="shipping"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label={t("nav.purchase.shipping")}
                          type="text"
                          value={(field.value || 0).toLocaleString()}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            );
                            field.onChange(rawValue ? Number(rawValue) : 0);
                          }}
                          error={errors?.shipping?.message}
                        />
                      )}
                    />

                    <Controller
                      name="returns"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label={t("nav.purchase.return")}
                          type="text"
                          value={(field.value || 0).toLocaleString()}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            );
                            field.onChange(rawValue ? Number(rawValue) : 0);
                          }}
                          error={errors?.returns?.message}
                        />
                      )}
                    />
                  </div>

                  <Textarea
                    label={t("nav.purchase.note")}
                    rows="5"
                    {...register("note")}
                    error={errors?.note?.message}
                    className="mt-5"
                  />
                </Card>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Page>
  );
};

export default EditPurchase;
