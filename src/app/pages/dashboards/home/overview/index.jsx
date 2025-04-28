import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { Select, Swap, SwapOff, SwapOn } from "components/ui";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Avatar, Card } from "components/ui";
// import { useState } from "react";
import { useTranslation } from "react-i18next";

const Overivew = () => {
  const { t } = useTranslation();

  // const [isShowed, setIsShowed] = useState(false);

  // const handleShow = () => {
  //   setIsShowed((prev) => !prev);
  // };
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4">
      <div className="flex w-full items-center justify-end gap-4">
        <div className="flex h-full items-center justify-center">
          <Swap defaultValue="on" effect="flip">
            <SwapOn>
              <EyeIcon
                className="size-7 cursor-pointer stroke-[1.5] text-[#155dfc]"
                // onClick={handleShow}
              />
            </SwapOn>
            <SwapOff>
              <EyeSlashIcon
                className="size-7 cursor-pointer stroke-[1.5] text-[#155dfc]"
                // onClick={handleShow}
              />
            </SwapOff>
          </Swap>
        </div>
        <div className="flex items-center justify-end gap-2">
          <h2 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
            {t("nav.setting.company")} :
          </h2>
          <Select
            defaultValue="Potato"
            data={["Apple", "Orange", "Potato", "Tomato"]}
            className="w-32"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              7.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              6.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              6.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              6.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              6.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              6.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              6.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
        <Card className="flex justify-between p-5">
          <div>
            <p>Sales</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              6.5k
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
      </div>
    </div>
  );
};

export default Overivew;
