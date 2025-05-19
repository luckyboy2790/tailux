import * as Yup from "yup";

export const schema = Yup.object().shape({
  digitalNumber: Yup.string()
    .trim()
    .matches(/^[0-9]{6}$/, "Must be exactly 6 digits")
    .required("Digital number Required"),
});
