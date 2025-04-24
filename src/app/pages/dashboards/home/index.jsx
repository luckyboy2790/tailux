import { Page } from "components/shared/Page";

export default function Home() {
  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
            Blank Page
          </h2>
        </div>
      </div>
    </Page>
  );
}
