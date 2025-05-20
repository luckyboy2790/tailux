import * as Yup from "yup";

export const schema = Yup.object().shape({
  username: Yup.string().trim().required("User Name Required"),
  password: Yup.string().trim().required("Password Required"),
});
