import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import CompanyIcon from "assets/dualicons/company.svg?react";
import { useTranslation } from "react-i18next";
import { Box, Button, Input, Select } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { FilePond } from "components/shared/form/Filepond";
import { ConcurrentTable } from "./components/ConcurrentTable";
import { FaFileInvoice } from "react-icons/fa";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const PurchaseList = () => {
  const { t } = useTranslation();

  const [supplier, setSupplier] = useState([]);
  const [supplierId, setSupplierId] = useState("");

  const [tableData, setTableData] = useState([]);

  const breadcrumbs = [
    {
      title: t("nav.payment.concurrent_payments"),
      path: "/concurrent_payments",
    },
    { title: t("nav.payment.form") },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const supplierResponse = await fetch(
        `${API_URL}/api/supplier/get_all_suppliers`,
      );

      const supplierResult = await supplierResponse.json();

      const supplierData = [
        {
          key: -1,
          value: "",
          label: "Select Supplier",
          disabled: false,
        },
        ...(Array.isArray(supplierResult?.data) ? supplierResult.data : []).map(
          (item, key) => ({
            key,
            value: item?.id,
            label: item?.company,
            disabled: false,
          }),
        ),
      ];

      setSupplier(supplierData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (supplierId !== "") {
        const response = await fetch(
          `${API_URL}/api/supplier/get_purchases?supplier_id=${supplierId}`,
        );

        const result = await response.json();

        console.log(result);

        setTableData(result?.data?.data);
      }
    };

    fetchData();
  }, [supplierId]);

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CompanyIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.payment.concurrent_payments")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <Box className="shadow-soft dark:bg-dark-700 flex flex-col gap-4 rounded-lg bg-white px-4 py-4 sm:gap-5 sm:px-5 dark:shadow-none">
            <Select
              label={t("nav.payment.select_supplier")}
              value={supplierId || ""}
              data={supplier}
              onChange={(e) => {
                setSupplierId(e.target.value);
              }}
            />
          </Box>

          {supplierId !== "" && (
            <Box className="shadow-soft dark:bg-dark-700 flex flex-col gap-4 rounded-lg bg-white px-4 py-4 sm:gap-5 sm:px-5 dark:shadow-none">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                <DatePicker label="Date" placeholder="Date" />
                <Input label="Reference No" placeholder="Reference No" />
                <Input label="Note" placeholder="Note" />
              </div>

              <div>
                <FilePond allowMultiple={false} />
              </div>

              <div>
                <ConcurrentTable tableData={tableData} />
              </div>

              <div className="flex w-full items-center justify-end">
                <Button color="primary" className="flex items-center gap-2">
                  <FaFileInvoice /> Submit
                </Button>
              </div>
            </Box>
          )}
        </div>
      </div>
    </Page>
  );
};

export default PurchaseList;
