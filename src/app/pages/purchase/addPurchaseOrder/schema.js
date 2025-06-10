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
    supplier_id: Yup.string().required(t("nav.purchase.select_supplier")),
    discount: Yup.string(),
  });
};

export default useValidationSchema;
