// Import Dependencies
import * as Yup from "yup";

// Local Imports
import { isDeltaNotEmpty } from "utils/quillUtils";

// ----------------------------------------------------------------------

export const schema = Yup.object().shape({
  purchase_date: Yup.date().required("Purchase Date Required"),
  reference_no: Yup.string()
    .trim()
    .min(2, "Reference No Too Short!")
    .max(50, "Reference No Too Long!")
    .required("Reference No Required"),
  store: Yup.string().required("Please Select Store"),
  supplier_id: Yup.string().required("Please Select Supplier"),
  attachment: Yup.mixed()
    .nullable()
    .required("You need to provide a file")
    .test(
      "fileSize",
      "Max file size should be 4MB",
      (value) => value && value.size <= 4194304,
    ),
  day_of_credit: Yup.number().required().positive().integer(),
  product_name: Yup.string()
    .trim()
    .min(2, "Product Title Too Short!")
    .max(50, "Product Title Too Long!")
    .required("Product Title Required"),
  expiry_date: Yup.date().required("Choose Expiry Date"),
  product_cost: Yup.number().required("Input Product Cost"),
  product_quantity: Yup.number().required("Input Product Quantity"),
  discount: Yup.number().required("Input Product Discount"),
  shipping: Yup.number().required("Input Product Shipping"),
  returns: Yup.number().required("Input Product Returns"),
  note: Yup.string(),
  title: Yup.string()
    .trim()
    .min(2, "Blog Title Too Short!")
    .max(50, "Blog Title Too Long!")
    .required("Blog Title Required"),
  // .matches(/^[A-Z0-9]+$/, 'Invalid Blog Title'),
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
