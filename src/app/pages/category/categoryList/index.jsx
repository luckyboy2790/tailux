import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { useTranslation } from "react-i18next";
import CategoryTable from "./dataTable";
import { LiaSitemapSolid } from "react-icons/lia";

const CategoryList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.category.category"), path: "/category" },
    { title: t("nav.category.category") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LiaSitemapSolid className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.category.category")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <CategoryTable />
        </div>
      </div>
    </Page>
  );
};

export default CategoryList;
