import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import CompanyIcon from "assets/dualicons/company.svg?react";
import { useTranslation } from "react-i18next";
import { Box, Button, Input } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { FaFileInvoice } from "react-icons/fa";
import { Select } from "antd";
import { useThemeContext } from "app/contexts/theme/context";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { useAuthContext } from "app/contexts/auth/context";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const PurchaseList = () => {
  const { isDark } = useThemeContext();

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { user } = useAuthContext();
  const [step, setStep] = useState(1);
  const [codeSent, setCodeSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const { t } = useTranslation();

  const breadcrumbs = [
    {
      title: t("nav.advanced_delete.advanced_delete"),
      path: "/advanced_delete",
    },
    { title: t("nav.payment.form") },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/api/supplier/get_all_suppliers`);

      const data = await response.json();

      const supplierData = (data?.data ?? []).map((item) => ({
        value: item?.id,
        label: item?.company,
      }));

      setSuppliers(supplierData);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (step === 1) {
      const res = await fetch(
        `${API_URL}/api/advanced_delete/verify/send-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email }),
        },
      );

      const result = await res.json();
      if (result.success) {
        setStep(2);
        setCodeSent(true);
      } else {
        alert(result.message || "Failed to send verification code.");
      }
    } else if (step === 2) {
      // fallback: all supplier IDs
      const supplierIDs = selectedSuppliers.length
        ? selectedSuppliers
        : suppliers.map((s) => s.value);

      const payload = {
        email: user?.email,
        code: verifyCode,
        startDate,
        endDate,
        suppliers: supplierIDs,
      };

      const res = await fetch(`${API_URL}/api/advanced_delete/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.success) {
        alert(result.message || "Verification failed");
        return;
      }

      alert("Deletion completed successfully!");
      // Reset state after success
      setStep(1);
      setCodeSent(false);
      setVerifyCode("");
      setSelectedSuppliers([]);
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Page title="Homepage">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex min-w-0 flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <CompanyIcon className="size-6 shrink-0 stroke-[1.5]" />
                <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                  {t("nav.advanced_delete.advanced_delete")}
                </h2>
              </div>
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <Box className="shadow-soft dark:bg-dark-700 flex flex-col gap-4 rounded-lg bg-white px-4 py-4 sm:gap-5 sm:px-5 dark:shadow-none">
              <DatePicker
                options={{
                  mode: "range",
                  dateFormat: "Y-m-d",
                }}
                placeholder={t("nav.choose_date")}
                label={t("nav.date")}
                value={startDate && endDate ? [startDate, endDate] : []}
                onChange={(value) => {
                  setStartDate(
                    value?.[0] ? value[0].toISOString().slice(0, 10) : null,
                  );
                  setEndDate(
                    value?.[1] ? value[1].toISOString().slice(0, 10) : null,
                  );
                }}
              />

              <Select
                mode="multiple"
                size="middle"
                showSearch
                placeholder={t("nav.select_supplier")}
                style={{
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                }}
                options={suppliers}
                value={selectedSuppliers}
                onChange={(values) => setSelectedSuppliers(values)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />

              {codeSent && step === 2 && (
                <Input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  placeholder="Enter verification code"
                />
              )}

              <div className="flex w-full items-center justify-end">
                <Button
                  color="primary"
                  className="flex items-center gap-2"
                  onClick={handleSubmit}
                >
                  <FaFileInvoice />
                  {step === 1
                    ? t("nav.advanced_delete.submit")
                    : t("nav.advanced_delete.verify_submit")}
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </Page>
    </ConfigProvider>
  );
};

export default PurchaseList;
