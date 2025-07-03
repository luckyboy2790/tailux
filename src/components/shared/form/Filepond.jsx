// Import Dependencies
import { FilePond as BaseFilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { forwardRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import filepondCSS from "filepond/dist/filepond.min.css?inline";
import filepondImagePreviewCSS from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css?inline";

import {
  injectStyles,
  insertStylesToHead,
  makeStyleTag,
} from "utils/dom/injectStylesToHead";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const styles = `@layer vendor {
  ${filepondCSS} ${filepondImagePreviewCSS}
}`;

const sheet = makeStyleTag();

injectStyles(sheet, styles);
insertStylesToHead(sheet);

const FilePond = forwardRef(
  (
    {
      className,
      classNames,
      bordered = true,
      filled = false,
      grid = 1,
      style,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation();

    return (
      <div
        className={clsx(
          className,
          classNames?.root,
          bordered && "fp-bordered",
          filled && "fp-filled",
          grid && grid > 1 && "fp-grid",
        )}
        style={{ "--fp-grid": grid, ...style }}
      >
        <BaseFilePond
          className={classNames?.filepond}
          allowFileTypeValidation={true}
          acceptedFileTypes={["image/*"]}
          ref={ref}
          {...rest}
          labelIdle={t("nav.upload.labelIdle")}
        />
      </div>
    );
  },
);

FilePond.displayName = "FilePond";

FilePond.propTypes = {
  className: PropTypes.string,
  classNames: PropTypes.object,
  bordered: PropTypes.bool,
  filled: PropTypes.bool,
  grid: PropTypes.number,
  style: PropTypes.object,
};

export { FilePond };
