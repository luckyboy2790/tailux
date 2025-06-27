import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";

// Local Imports
import useValidationSchema from "./schema";
import { Page } from "components/shared/Page";
import { Button, GhostSpinner, Input, Select, Textarea } from "components/ui";
import { CoverImageUpload } from "./components/CoverImageUpload";
import { DatePicker } from "components/shared/form/Datepicker";
import { OrderItemsTable } from "./components/OrderItemsTable";
import { useAuthContext } from "app/contexts/auth/context";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialData = [
  {
    product_name: "",
    expiry_date: "",
    product_price: 0,
    quantity: 1,
  },
];

const AddSale = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const { id } = useParams();
  const [orders, setOrders] = useState(initialData);
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [cookie] = useCookies();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(useValidationSchema()),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    const init = async () => {
      const storeRes = await fetch(`${API_URL}/api/store/get_stores`, {
        headers: {
          Authorization: cookie?.authToken ? `Bearer ${cookie.authToken}` : "",
        },
      });
      const storeResult = await storeRes.json();
      const storeData = [
        { key: -1, value: "", label: "Select store" },
        ...(storeResult?.data?.map((item, key) => ({
          key,
          value: item?.id,
          label: item?.name,
        })) ?? []),
      ];
      setStores(storeData);

      const userRes = await fetch(`${API_URL}/api/users`, {
        headers: {
          Authorization: cookie?.authToken ? `Bearer ${cookie.authToken}` : "",
        },
      });
      const userResult = await userRes.json();
      const userData = [
        { key: -1, value: "", label: "Select users" },
        ...(userResult?.map((item, key) => ({
          key,
          value: item?.id,
          label: `${item.first_name} ${item.last_name}`,
        })) ?? []),
      ];
      setUsers(userData);

      const customerRes = await fetch(
        `${API_URL}/api/customer/get_all_customers`,
        {
          headers: {
            Authorization: cookie?.authToken
              ? `Bearer ${cookie.authToken}`
              : "",
          },
        },
      );
      const customerResult = await customerRes.json();
      const customerData = [
        { key: -1, value: "", label: t("nav.select.select_customer") },
        ...(customerResult?.data?.map((item, key) => ({
          key,
          value: item?.id,
          label: `${item?.company}`,
        })) ?? []),
      ];
      setCustomer(customerData);

      reset({
        store: user.first_store_id,
        user_id: user.id,
      });
    };

    init();
  }, [id, reset, user, cookie.authToken, t]);

  const onSubmit = async (formData) => {
    setIsLoading(true);

    const payload = {
      id,
      date: formData.sale_date,
      reference_no: formData.reference_no,
      store: Number(formData.store),
      customer: Number(formData.customer_id),
      orders: orders.map((o) => ({
        product: o.product_name || "",
        product_id: o.product_id || 1,
        price: o.product_price,
        quantity: o.quantity,
      })),
      orders_json: JSON.stringify(
        orders.map((o) => ({
          product: o.product_name || "",
          product_id: o.product_id || 1,
          price: o.product_price,
          quantity: o.quantity,
        })),
      ),
      grand_total: orders.reduce(
        (sum, o) =>
          sum + Number(o.product_price || 0) * Number(o.quantity || 1),
        0,
      ),
      note: formData.note || "",
      status: 1,
    };

    console.log(payload);

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

      const res = await fetch(`${API_URL}/api/sales/create`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: cookie?.authToken ? `Bearer ${cookie.authToken}` : "",
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");

      navigate("/sale/list");
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
              {t("nav.sale.sale_add")}
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  <Controller
                    name="sale_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        onChange={(val) =>
                          field.onChange(dayjs(val).format("YYYY-MM-DD"))
                        }
                        value={field.value || ""}
                        label={t("nav.sale.sale_date")}
                        error={errors?.sale_date?.message}
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
                    label={t("nav.purchase.supplier")}
                    data={users}
                    {...register("user_id")}
                    error={errors?.user_id?.message}
                    disabled
                  />

                  <Select
                    label={t("nav.purchase.store")}
                    data={stores}
                    {...register("store")}
                    error={errors?.store?.message}
                    disabled
                  />

                  <Select
                    label={t("nav.people.customer")}
                    data={customer}
                    {...register("customer_id")}
                    error={errors?.customer_id?.message}
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

                <div className="mt-5 space-y-5">
                  <OrderItemsTable orders={orders} setOrders={setOrders} />
                </div>

                <div className="mt-5 space-y-5">
                  <Textarea
                    label={t("nav.purchase.note")}
                    rows="5"
                    {...register("note")}
                    error={errors?.note?.message}
                    className="mt-5"
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

export default AddSale;
