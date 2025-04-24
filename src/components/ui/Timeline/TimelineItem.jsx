// Import Dependencies
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import clsx from "clsx";

// Local Imports
import { setThisClass } from "utils/setThisClass";
import { useLocaleContext } from "app/contexts/locale/context";
import { useTimelineContext } from "./context";
import { COLORS } from "constants/app.constant";

// ----------------------------------------------------------------------

dayjs.extend(relativeTime);

const variants = {
  filled: "bg-this dark:bg-this-light",
  outlined: "border-2 border-this dark:border-this-light",
};

const neutralVariant = {
  filled: "bg-gray-300 dark:bg-dark-400",
  outlined: "border-2 border-gray-300 dark:border-dark-400",
};

const TimelineItem = ({
  children,
  title,
  time,
  point,
  color = "neutral",
  variant,
  className,
  classNames = {},
  isPing,
  ...rest
}) => {
  const { locale } = useLocaleContext();

  const ctx = useTimelineContext();

  const mergedVariant = variant || ctx.variant;

  const formattedTime = dayjs(time).locale(locale).fromNow();

  const pointNode = (
    <div
      className={clsx(
        "timeline-item-point relative flex shrink-0 items-center justify-center rounded-full",
        color === "neutral"
          ? neutralVariant[mergedVariant]
          : [setThisClass(color), variants[mergedVariant]],
        classNames?.point,
      )}
    >
      {isPing && (
        <span className="inline-flex h-full w-full animate-ping rounded-full bg-inherit opacity-80"></span>
      )}
    </div>
  );

  return (
    <div className={clsx("timeline-item", className, classNames?.root)} {...rest}>
      {point ? point : pointNode}

      <div
        className={`timeline-item-content-wrappper ${classNames?.contentWrapper}`}
      >
        <div className="flex flex-col pb-1.5">
          <h3
            className={clsx(
              "pb-1.5 font-medium leading-none text-gray-600 dark:text-dark-100",
              classNames?.title,
            )}
          >
            {title}
          </h3>
          <span
            className={clsx(
              "text-xs text-gray-400 dark:text-dark-300",
              classNames?.time,
            )}
          >
            {formattedTime}
          </span>
        </div>
        <div className={clsx("timeline-item-content py-1", classNames?.content)}>
          {children}
        </div>
      </div>
    </div>
  );
};

TimelineItem.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  point: PropTypes.node,
  color: PropTypes.oneOf(COLORS),
  variant: PropTypes.oneOf(["filled", "outlined"]),
  className: PropTypes.string,
  classNames: PropTypes.object,
  isPing: PropTypes.bool,
};

export { TimelineItem };
