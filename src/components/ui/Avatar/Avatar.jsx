// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { colorFromText } from "utils/colorFromText";
import { setThisClass } from "utils/setThisClass";

// ----------------------------------------------------------------------

const variants = {
  filled: "bg-this text-white",
  soft: "text-this-darker bg-this-darker/10 dark:text-this-lighter dark:bg-this-lighter/10",
};

const neutralVariants = {
  filled: "bg-gray-200 text-gray-700 dark:bg-surface-2 dark:text-dark-100",
  soft: "bg-gray-200/30 text-gray-700 dark:bg-surface-2/30 dark:text-dark-100",
};

const Avatar = forwardRef((props, ref) => {
  const {
    component,
    imgComponent,
    alt,
    loading = "lazy",
    imgProps,
    src,
    srcSet,
    name,
    initialColor = "neutral",
    initialVariant = "filled",
    initialProps,
    className,
    classNames = {},
    children,
    size = 12,
    style,
    indicator,
    ...rest
  } = props;
  const Component = component || "div";
  const ImgComponent = imgComponent || "img";

  let resolvedColor = initialColor;
  let chars;

  if (name) {
    chars = name
      .match(/\b(\w)/g)
      .slice(0, 2)
      .join("");
    if (initialColor === "auto") {
      resolvedColor = colorFromText(chars);
    }
  }

  return (
    <Component
      className={clsx(
        "avatar relative inline-flex shrink-0",
        className,
        classNames?.root,
      )}
      ref={ref}
      style={{ height: `${size / 4}rem`, width: `${size / 4}rem`, ...style }}
      {...rest}
    >
      {src || srcSet ? (
        <ImgComponent
          className={clsx(
            "avatar-image avatar-display relative h-full w-full before:absolute before:inset-0 before:rounded-[inherit] before:bg-gray-150 dark:before:bg-dark-600",
            classNames?.display,
            classNames?.image,
          )}
          src={src}
          srcSet={srcSet}
          alt={alt || name || "avatar"}
          loading={loading}
          {...imgProps}
        />
      ) : (
        <div
          className={clsx(
            "avatar-initial avatar-display flex h-full w-full select-none items-center justify-center font-medium uppercase",
            resolvedColor !== "neutral"
              ? [setThisClass(resolvedColor), variants[initialVariant]]
              : neutralVariants[initialVariant],
            classNames?.display,
            classNames?.initial,
          )}
          {...initialProps}
        >
          {name ? chars : children}
        </div>
      )}

      {indicator}
    </Component>
  );
});

Avatar.displayName = "Avatar";

Avatar.propTypes = {
  component: PropTypes.elementType,
  imgComponent: PropTypes.elementType,
  alt: PropTypes.string,
  loading: PropTypes.oneOf(["auto", "lazy", "eager"]),
  imgProps: PropTypes.object,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  name: PropTypes.string,
  initialColor: PropTypes.string,
  initialVariant: PropTypes.string,
  initialProps: PropTypes.object,
  className: PropTypes.string,
  classNames: PropTypes.object,
  children: PropTypes.node,
  size: PropTypes.number,
  style: PropTypes.object,
  indicator: PropTypes.node,
};

export { Avatar };
