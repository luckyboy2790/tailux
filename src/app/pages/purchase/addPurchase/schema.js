import * as Yup from "yup";
import { isDeltaNotEmpty } from "utils/quillUtils";
import { useTranslation } from "react-i18next";

const useValidationSchema = () => {
  const { t } = useTranslation(); // Use the hook here inside the component

  return Yup.object().shape({
    purchase_date: Yup.date().required(
      t("nav.purchase.purchase_date_required"),
    ),
    reference_no: Yup.string()
      .trim()
      .min(1, t("nav.purchase.reference_no_too_short"))
      .required(t("nav.purchase.reference_no_required")),
    store: Yup.string().required(t("nav.purchase.select_store")),
    supplier_id: Yup.string().required(t("nav.purchase.select_supplier")),
    attachment: Yup.mixed()
      .nullable()
      .required(t("nav.purchase.attachment_required"))
      .test(
        "fileSize",
        t("nav.purchase.file_size"),
        (value) => value && value.size <= 4194304,
      ),
    day_of_credit: Yup.number()
      .required()
      .positive()
      .integer()
      .min(1, t("nav.purchase.credit_must_amount")),
    product_name: Yup.string()
      .trim()
      .min(2, t("nav.purchase.product_name_too_short"))
      .required(t("nav.purchase.product_name_required")),
    expiry_date: Yup.date().required(t("nav.purchase.expiry_date_required")),
    product_cost: Yup.number().required(
      t("nav.purchase.product_cost_required"),
    ),
    product_quantity: Yup.number().required(
      t("nav.purchase.product_quantity_required"),
    ),
    discount: Yup.number().required(t("nav.purchase.discount_required")),
    shipping: Yup.number().required(t("nav.purchase.shipping_required")),
    returns: Yup.number().required(t("nav.purchase.return_required")),
    note: Yup.string(),
    title: Yup.string()
      .trim()
      .min(2, "Blog Title Too Short!")
      .max(50, "Blog Title Too Long!")
      .required("Blog Title Required"),
    caption: Yup.string()
      .trim()
      .min(2, "Blog Caption Too Short!")
      .max(50, "Blog Caption Too Long!")
      .required("Blog Caption Required"),
    content: Yup.object()
      .required("Blog Description Required")
      .test("notEmpty", "Content Can't be empty", isDeltaNotEmpty),
    cover: Yup.mixed()
      .nullable()
      .required("You need to provide a file")
      .test(
        "fileSize",
        "Max file size should be 4MB",
        (value) => value && value.size <= 4194304,
      ),
    author_id: Yup.string().required("Please Select Author"),
    category_id: Yup.string().required("Please Select Author"),
    tags: Yup.array().of(Yup.string().nullable()).max(10),
    publish_date: Yup.date().required("Publish Date Required"),
    meta: Yup.object().shape({
      title: Yup.string().trim().max(60, "Meta Title Too Long!"),
      description: Yup.string().trim().max(160, "Meta Description Too Long!"),
      keywords: Yup.array()
        .of(Yup.string())
        .min(0)
        .max(10)
        .required("Meta Keywords Required"),
    }),
  });
};

export default useValidationSchema;
