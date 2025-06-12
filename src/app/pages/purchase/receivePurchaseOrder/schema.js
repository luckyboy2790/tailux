import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const useValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    reference_no: Yup.string()
      .trim()
      .required(t("nav.purchase.reference_no_required")),
    store_id: Yup.string().trim().required(t("nav.purchase.select_store")),
    shipping_carrier: Yup.string(),
  });
};

export default useValidationSchema;
