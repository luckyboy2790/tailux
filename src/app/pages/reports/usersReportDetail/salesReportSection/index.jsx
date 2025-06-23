import { Page } from "components/shared/Page";
import PurchaseTable from "./dataTable";

const SalesReport = () => {
  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <PurchaseTable />
        </div>
      </div>
    </Page>
  );
};

export default SalesReport;
