import * as Yup from "yup";

export const getSchema = (t) =>
  Yup.object().shape({
    digitalNumber: Yup.string()
      .trim()
      .matches(/^[0-9]{6}$/, t("nav.auth.google2Fa.must_6_digits"))
      .required(t("nav.auth.google2Fa.digital_number_required")),
  });
