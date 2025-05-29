import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import CompanyIcon from "assets/dualicons/company.svg?react";
import { useTranslation } from "react-i18next";
import { Box, Button } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { FaFileInvoice } from "react-icons/fa";
import { useState } from "react";
import { Listbox } from "components/shared/form/Listbox";

const PurchaseList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("nav.advanced_delete.advanced_delete"),
      path: "/advanced_delete",
    },
    { title: t("nav.payment.form") },
  ];

  const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
  ];

  const [selected, setSelected] = useState([people[0]]);

  return (
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
            />

            <Listbox
              data={people}
              value={selected}
              onChange={setSelected}
              displayField="name"
              placeholder={t("nav.select_supplier")}
              label={t("nav.supplier")}
              multiple
            />

            <div className="flex w-full items-center justify-end">
              <Button color="primary" className="flex items-center gap-2">
                <FaFileInvoice /> {t("nav.advanced_delete.submit")}
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </Page>
  );
};

export default PurchaseList;
