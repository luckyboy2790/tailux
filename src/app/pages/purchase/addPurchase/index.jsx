// Import Dependencies
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Local Imports
import { schema } from "./schema";
import { Page } from "components/shared/Page";
import { Button, Card, Input, Select, Textarea } from "components/ui";
import { Delta } from "components/shared/form/TextEditor";
import { CoverImageUpload } from "./components/CoverImageUpload";
// import { Tags } from "./components/Tags";
// import { ContextualHelp } from "components/shared/ContextualHelp";
// import { DatePicker } from "components/shared/form/Datepicker";
// import { Listbox } from "components/shared/form/Listbox";
// import { Combobox } from "components/shared/form/Combobox";
import { useTranslation } from "react-i18next";
import { DatePicker } from "components/shared/form/Datepicker";
import { OrderItemsTable } from "./components/OrderItemsTable";

// ----------------------------------------------------------------------

const initialState = {
  title: "",
  caption: "",
  content: new Delta(),
  cover: null,
  category_id: "",
  author_id: "",
  tags: [],
  publish_date: "",
  meta: {
    title: "",
    description: "",
    keywords: [],
  },
};

// const categories = [
//   {
//     id: "1",
//     label: "Accessories",
//   },
//   {
//     id: "2",
//     label: "Digital",
//   },
//   {
//     id: "3",
//     label: "Home",
//   },
//   {
//     id: "4",
//     label: "Technology",
//   },
// ];

// const people = [
//   { id: 1, name: "Wade Cooper" },
//   { id: 2, name: "Arlene Mccoy" },
//   { id: 3, name: "Devon Webb" },
//   { id: 4, name: "Tom Cook" },
//   { id: 5, name: "Tanya Fox" },
//   { id: 6, name: "Hellen Schmidt" },
// ];

const AddPurchase = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const onSubmit = (data) => {
    console.log(data);
    toast("New Post Published. Now you can add new one", {
      invert: true,
    });
    reset();
  };

  return (
    <Page title="New Post Form">
      <div className="transition-content px-(--margin-x) pb-6">
        <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
          <div className="flex items-center gap-1">
            <DocumentPlusIcon className="size-6" />
            <h2 className="dark:text-dark-50 line-clamp-1 text-xl font-medium text-gray-700">
              {t("nav.purchase.add_purchase")}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              className="min-w-[7rem]"
              color="primary"
              type="submit"
              form="new-post-form"
            >
              Save
            </Button>
          </div>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          id="new-post-form"
        >
          <div className="w-full">
            <div className="col-span-12 lg:col-span-8">
              <Card className="p-4 sm:px-5">
                <h3 className="dark:text-dark-100 text-base font-medium text-gray-800">
                  General
                </h3>
                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    <div className="w-full">
                      <Controller
                        render={({ field: { onChange, value, ...rest } }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            label="Purchase Date"
                            error={errors?.purchase_date?.message}
                            options={{ disableMobile: true }}
                            placeholder="Choose date..."
                            {...rest}
                          />
                        )}
                        control={control}
                        name="purchase_date"
                      />
                    </div>

                    <div className="w-full">
                      <Input
                        label="Reference No"
                        placeholder="Enter the reference no"
                        {...register("reference_no")}
                        error={errors?.reference_no?.message}
                      />
                    </div>

                    <div className="w-full">
                      <Select
                        label="Supplier"
                        defaultValue=""
                        data={["", "Apple", "Orange", "Potato", "Tomato"]}
                        {...register("supplier_id")}
                        error={errors?.supplier_id?.message}
                      />
                    </div>

                    <div className="flex w-full items-start">
                      <div className="flex w-full items-end">
                        <div className="w-full">
                          <Select
                            label="Supplier"
                            data={["Apple", "Orange", "Potato", "Tomato"]}
                            {...register("store")}
                            error={errors?.store?.message}
                          />
                        </div>
                        <Button color="primary" isGlow>
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="w-full">
                      <Input
                        label="Days Of Credit"
                        type="number"
                        placeholder="Days Of Credit"
                        {...register("day_of_credit")}
                        error={errors?.day_of_credit?.message}
                      />
                    </div>
                  </div>

                  <Controller
                    render={({ field }) => (
                      <CoverImageUpload
                        classNames={{
                          box: "mt-1.5",
                        }}
                        label="Attachment"
                        error={errors?.attachment?.message}
                        {...field}
                      />
                    )}
                    name="attachment"
                    control={control}
                  />
                </div>

                <div className="mt-5 space-y-5">
                  <OrderItemsTable />
                </div>

                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    <div className="w-full">
                      <Input
                        label="Discount"
                        type="number"
                        defaultValue={0}
                        {...register("discount")}
                        error={errors?.discount?.message}
                      />
                    </div>

                    <div className="w-full">
                      <Input
                        label="Shipping"
                        type="number"
                        defaultValue={0}
                        {...register("shipping")}
                        error={errors?.shipping?.message}
                      />
                    </div>

                    <div className="w-full">
                      <Input
                        label="Return"
                        type="number"
                        defaultValue={0}
                        {...register("returns")}
                        error={errors?.returns?.message}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  <div className="w-full">
                    <Textarea
                      label="Note"
                      placeholder="Enter text"
                      rows="5"
                      {...register("note")}
                      error={errors?.note?.message}
                    />
                  </div>
                </div>
              </Card>
            </div>
            {/* <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-4 lg:space-y-6">
              <Card className="space-y-5 p-4 sm:px-5">
                <Controller
                  render={({ field }) => (
                    <Listbox
                      data={categories}
                      value={
                        categories.find((cat) => cat.id === field.value) || null
                      }
                      onChange={(val) => field.onChange(val.id)}
                      name={field.name}
                      label="Category"
                      placeholder="Select Category"
                      displayField="label"
                      error={errors?.category_id?.message}
                    />
                  )}
                  control={control}
                  name="category_id"
                />

                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Combobox
                      data={people}
                      displayField="name"
                      value={people.find((user) => user.id === value) || null}
                      onChange={(val) => onChange(val?.id)}
                      placeholder="Please Select Author"
                      label="Select Author"
                      searchFields={["name"]}
                      error={errors?.author_id?.message}
                      highlight
                      {...rest}
                    />
                  )}
                  control={control}
                  name="author_id"
                />

                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Tags
                      value={
                        value?.map((val, i) => {
                          return { id: i, value: val };
                        }) || []
                      }
                      placeholder="Enter Tags"
                      onChange={(val) => onChange(val.map((i) => i.value))}
                      error={errors?.tags?.message}
                      label="Tags"
                      {...rest}
                    />
                  )}
                  control={control}
                  name="tags"
                />

                <Controller
                  render={({ field: { onChange, value, ...rest } }) => (
                    <DatePicker
                      onChange={onChange}
                      value={value || ""}
                      label="Publish Date"
                      error={errors?.publish_date?.message}
                      options={{ disableMobile: true }}
                      placeholder="Choose date..."
                      {...rest}
                    />
                  )}
                  control={control}
                  name="publish_date"
                />
              </Card>

              <Card className="p-4 sm:px-5">
                <h6 className="dark:text-dark-100 flex space-x-1.5 text-base font-medium text-gray-800">
                  <span>SEO Meta Data</span>
                  <ContextualHelp
                    title="SEO Meta Data"
                    anchor={{ to: "bottom", gap: 8 }}
                    content={
                      <p>
                        SEO data is relevant information that your company needs
                        to be aware of so that your business can take full
                        advantage of all the opportunities presented with this
                        type of strategy.
                      </p>
                    }
                  />
                </h6>

                <div className="mt-3 space-y-5">
                  <Input
                    {...register("meta.title")}
                    label="Meta title"
                    error={errors?.meta?.title?.message}
                    placeholder="Enter Meta Title"
                  />
                  <Textarea
                    rows={4}
                    {...register("meta.description")}
                    label="Meta Description"
                    error={errors?.meta?.description?.message}
                    placeholder="Enter Meta Description"
                  />
                  <Controller
                    render={({ field }) => (
                      <Tags
                        placeholder="Enter Meta Keywords"
                        label="Meta Keywords"
                        name={field.name}
                        value={
                          field.value?.map((val, i) => {
                            return { id: i, value: val };
                          }) || []
                        }
                        onChange={(val) =>
                          field.onChange(val.map((i) => i.value))
                        }
                        error={errors?.meta?.keywords?.message}
                      />
                    )}
                    control={control}
                    name="meta.keywords"
                  />
                </div>
              </Card>
            </div> */}
          </div>
        </form>
      </div>
    </Page>
  );
};

export default AddPurchase;
