import * as Yup from "yup";

export const getSchema = (t) =>
  Yup.object().shape({
    username: Yup.string()
      .trim()
      .required(t("nav.auth.login.username_required")),
    password: Yup.string()
      .trim()
      .required(t("nav.auth.login.password_required")),
  });
