import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import ProductIcon from "assets/dualicons/products.svg?react";
import { useTranslation } from "react-i18next";
import ProductTable from "./productTable";

const ProductList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.product.product"), path: "/product" },
    { title: t("nav.product.product_list") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ProductIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.product.product")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <ProductTable />
        </div>
      </div>
    </Page>
  );
};

export default ProductList;
