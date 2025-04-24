// Import Dependencies
import PropTypes from "prop-types";
import { XMarkIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

// Local Imports
import { Button } from "components/ui";

// ----------------------------------------------------------------------

export function FileItemSquare({ file, handleRemove, ...rest }) {
  const { type, name } = file;
  const isImage = type.split("/")[0] === "image";

  return (
    <div
      title={name}
      className="group relative aspect-square size-20 rounded-lg ring-primary-600 ring-offset-4 ring-offset-white transition-all hover:ring-3 dark:ring-primary-500 dark:ring-offset-dark-700"
      {...rest}
    >
      {isImage ? (
        <img
          className="h-full w-full object-contain"
          src={URL.createObjectURL(file)}
          alt={name}
        />
      ) : (
        <div className="h-full w-full select-none rounded-lg bg-gray-150 px-1 py-2 text-center dark:bg-dark-900">
          <DocumentTextIcon className="m-auto size-8 text-gray-500 dark:text-dark-200" />
          <span className="mt-1.5 line-clamp-2 text-tiny">{name}</span>
        </div>
      )}
      <div className="absolute -right-3 -top-4 flex items-center justify-center rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-dark-700">
        <Button
          onClick={handleRemove}
          className="size-6 shrink-0 rounded-full border p-0 dark:border-dark-450"
        >
          <XMarkIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

FileItemSquare.propTypes = {
  file: PropTypes.object,
  handleRemove: PropTypes.func,
};
