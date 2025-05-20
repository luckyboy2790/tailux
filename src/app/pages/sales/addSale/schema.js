import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const useValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    sale_date: Yup.string().required(t("nav.sale.sale_date_required")),
    reference_no: Yup.string()
      .trim()
      .required(t("nav.purchase.reference_no_required")),
    store: Yup.string().required(t("nav.purchase.select_store")),
    user_id: Yup.string().required(t("nav.purchase.select_user")),
    customer_id: Yup.string().required(t("nav.purchase.customer_required")),
  });
};

export default useValidationSchema;
