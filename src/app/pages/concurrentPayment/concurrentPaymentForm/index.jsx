import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import CompanyIcon from "assets/dualicons/company.svg?react";
import { useTranslation } from "react-i18next";
import { Box, Button, Input } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { FilePond } from "components/shared/form/Filepond";
import { ConcurrentTable } from "./components/ConcurrentTable";
import { FaFileInvoice } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Combobox } from "components/shared/form/Combobox";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const ConcurrentPage = () => {
  const { t } = useTranslation();

  const [supplier, setSupplier] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [referenceNo, setReferenceNo] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [checkedRows, setCheckedRows] = useState({});

  const navigate = useNavigate();

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

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
          label: "",
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
  }, [t]);

  useEffect(() => {
    const fetchData = async () => {
      if (supplierId !== "") {
        const response = await fetch(
          `${API_URL}/api/supplier/get_purchases?supplier_id=${supplierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        setTableData(result?.data?.data);
      }
    };

    fetchData();
  }, [supplierId, token]);

  const handleSubmit = async () => {
    const purchases = Object.entries(checkedRows)
      .filter(([, value]) => value.checked)
      .map(([id, value]) => ({
        id: Number(id),
        amount: Number(value.amount),
        checked: true,
      }));

    const formData = new FormData();
    formData.append("supplier_id", supplierId);
    formData.append("reference_no", referenceNo);
    formData.append("note", note);

    if (date[0] instanceof Date && !isNaN(date[0])) {
      formData.append("date", date[0].toISOString().slice(0, 10));
    }

    formData.append("purchases", JSON.stringify(purchases));

    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      const response = await fetch(`${API_URL}/api/payment/concurrent/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Upload failed");
        return;
      }

      toast.success("Upload success");

      navigate("/payment/pending");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

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
            <Combobox
              label={t("nav.payment.select_supplier")}
              value={supplier.find((item) => item.value === supplierId) || null}
              data={supplier}
              displayField="label"
              searchFields={["label"]}
              onChange={(selectedItem) =>
                setSupplierId(selectedItem?.value || "")
              }
              placeholder={t("nav.select.select_supplier")}
            />
          </Box>

          {supplierId !== "" && (
            <Box className="shadow-soft dark:bg-dark-700 flex flex-col gap-4 rounded-lg bg-white px-4 py-4 sm:gap-5 sm:px-5 dark:shadow-none">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                <DatePicker
                  label="Date"
                  placeholder="Date"
                  onChange={setDate}
                  value={date}
                />
                <Input
                  label="Reference No"
                  placeholder="Reference No"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                />
                <Input
                  label="Note"
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div>
                <FilePond
                  allowMultiple={true}
                  onupdatefiles={(fileItems) =>
                    setAttachment(fileItems.map((item) => item.file))
                  }
                />
              </div>
              <div>
                <ConcurrentTable
                  tableData={tableData}
                  checkedRows={checkedRows}
                  setCheckedRows={setCheckedRows}
                />
              </div>

              <div className="flex w-full items-center justify-end">
                <Button
                  color="primary"
                  className="flex items-center gap-2"
                  onClick={handleSubmit}
                >
                  <FaFileInvoice /> {t("nav.advanced_delete.submit")}
                </Button>
              </div>
            </Box>
          )}
        </div>
      </div>
    </Page>
  );
};

export default ConcurrentPage;
