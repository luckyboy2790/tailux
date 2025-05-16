import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const useValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    purchase_date: Yup.string().required(
      t("nav.purchase.purchase_date_required"),
    ),
    reference_no: Yup.string()
      .trim()
      .required(t("nav.purchase.reference_no_required")),
    store: Yup.string().required(t("nav.purchase.select_store")),
    supplier_id: Yup.string().required(t("nav.purchase.select_supplier")),
    day_of_credit: Yup.number()
      .typeError(t("nav.purchase.credit_must_amount"))
      .required(t("nav.purchase.credit_must_amount"))
      .min(1, t("nav.purchase.credit_must_amount"))
      .integer(t("nav.purchase.credit_must_amount")),
  });
};

export default useValidationSchema;
