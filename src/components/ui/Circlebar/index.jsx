// Import Dependencies
import PropTypes from "prop-types";
import { Children, forwardRef, useMemo } from "react";
import clsx from "clsx";

// Local Imports
import { setThisClass } from "utils/setThisClass";
import { COLORS } from "constants/app.constant";
import { getPathStyles } from "./getPathStyles";
import { useThemeContext } from "app/contexts/theme/context";
import { randomId } from "utils/randomId";

// ----------------------------------------------------------------------

const Circlebar = forwardRef((props, ref) => {
  const {
    value = 0,
    isIndeterminate = false,
    offsetDegree,
    gapDegree = 0,
    gapOffsetDegree = 0,
    strokeWidth = 6,
    strokeLinecap = "round",
    isActive = false,
    size = 24,
    showRail = true,
    children,
    color = "neutral",
    variant = "default",
    contentProps = {},
    rootProps = {},
    wrapperProps = {},
    className,
    classNames = {},
    gradient,
    ...rest
  } = props;
  const gradientId = `gradient-${randomId()}`;

  const viewBoxSize = 100 + strokeWidth;

  const { pathString: railPathString, pathStyle: railPathStyle } = useMemo(
    () => getPathStyles(100, 0, gapDegree, strokeWidth),
    [gapDegree, strokeWidth],
  );

  const { pathString: fillPathString, pathStyle: fillPathStyle } = useMemo(
    () => getPathStyles(value, offsetDegree, gapDegree, strokeWidth),
    [gapDegree, offsetDegree, strokeWidth, value],
  );

  const { cardSkin } = useThemeContext();

  const strokeClass = [
    variant === "gradient"
      ? ""
      : color === "neutral"
        ? "stroke-gray-500 dark:stroke-dark-450"
        : [setThisClass(color), "stroke-this dark:stroke-this-light"],
  ];

  return (
    <div className={clsx("max-w-full", classNames?.root)} {...rootProps}>
      <div
        {...wrapperProps}
        className={clsx(
          "circlebar-wrapper relative inline-block",
          classNames.wrapper,
        )}
        style={{ width: `${size / 4}rem`, height: `${size / 4}rem` }}
      >
        <svg
          style={{
            transform: gapOffsetDegree
              ? `rotate(${gapOffsetDegree}deg)`
              : undefined,
          }}
          ref={ref}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className={clsx(
            "circlebar-svg",
            isIndeterminate && "circlebar-indeterminate-wrapper",
            className,
            classNames?.svg,
          )}
          {...rest}
        >
          {showRail && (
            <path
              d={railPathString}
              strokeWidth={strokeWidth}
              strokeLinecap={strokeLinecap}
              fill="none"
              style={railPathStyle}
              className={clsx("circlebar-rail-path", [
                color === "neutral" || variant !== "soft"
                  ? [
                      "stroke-gray-150",
                      cardSkin === "shadow-sm"
                        ? "dark:stroke-dark-900"
                        : "dark:stroke-dark-700",
                    ]
                  : [
                      setThisClass(color),
                      "stroke-this/[.15] dark:stroke-this-light/20",
                    ],
              ])}
            />
          )}

          {!isIndeterminate ? (
            <>
              <path
                d={fillPathString}
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                fill="none"
                style={{
                  ...fillPathStyle,
                  transitionProperty: "stroke-dasharray",
                  transitionDuration: "200ms",
                }}
                className={clsx("circlebar-inner-path ease-out", strokeClass)}
                stroke={
                  variant === "gradient" ? `url(#${gradientId})` : undefined
                }
              />

              {isActive && (
                <path
                  d={fillPathString}
                  strokeWidth={strokeWidth}
                  strokeLinecap={strokeLinecap}
                  fill="none"
                  style={{
                    ...fillPathStyle,
                    "--dashoffset": `${
                      (value / 100) * (Math.PI * 100 - gapDegree)
                    }px`,
                    transformOrigin: "center",
                    transform: `rotate(${(gapDegree / 2) * 1.15}deg)`,
                  }}
                  className="circlebar-active-path stroke-white"
                />
              )}
            </>
          ) : (
            <circle
              cx={viewBoxSize / 2}
              cy={viewBoxSize / 2}
              r="50"
              fill="none"
              strokeWidth={strokeWidth}
              className={clsx("circlebar-indeterminate", strokeClass)}
              stroke={
                variant === "gradient" ? `url(#${gradientId})` : undefined
              }
            ></circle>
          )}

          {variant === "gradient" && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: gradient?.start,
                    stopOpacity: 1,
                  }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: gradient?.end, stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          )}
        </svg>
        {Children.count(children) > 0 && (
          <div
            className={clsx(
              "absolute inset-0 flex items-center justify-center",
              classNames?.content,
            )}
            {...contentProps}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
});

Circlebar.displayName = "Circlebar";

Circlebar.propTypes = {
  value: PropTypes.number,
  children: PropTypes.node,
  isIndeterminate: PropTypes.bool,
  offsetDegree: PropTypes.number,
  gapDegree: PropTypes.number,
  gapOffsetDegree: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.string,
  isActive: PropTypes.bool,
  size: PropTypes.number,
  showRail: PropTypes.bool,
  color: PropTypes.oneOf(COLORS),
  variant: PropTypes.oneOf(["default", "soft", "gradient"]),
  contentProps: PropTypes.object,
  rootProps: PropTypes.object,
  wrapperProps: PropTypes.object,
  className: PropTypes.string,
  classNames: PropTypes.object,
};

export { Circlebar };
