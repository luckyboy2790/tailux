// Import Dependencies
import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/24/solid";

// Local Imports
import { Upload, Button, Input } from "components/ui";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const CoverImageUpload = ({ label, value = [], onChange }) => {
  const uploadRef = useRef();
  const { t } = useTranslation();

  const filesList =
    value.length > 0
      ? value.map((file) => file.name || file).join(", ")
      : t("nav.choose_file");

  const handleFileChange = (newFiles) => {
    const filesArray = Array.from(newFiles);
    onChange(filesArray);
  };

  const clearFiles = () => {
    uploadRef.current.value = "";
    onChange([]);
  };

  return (
    <div className="max-w-xl">
      <Upload
        name="file"
        label={label}
        multiple
        ref={uploadRef}
        onChange={handleFileChange}
      >
        {(props) => (
          <Input
            component="button"
            type="button"
            prefix={<PaperClipIcon className="size-5" />}
            suffix={
              value.length > 0 && (
                <Button
                  variant="flat"
                  className="pointer-events-auto size-5 shrink-0 rounded-full p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    clearFiles();
                  }}
                >
                  <XMarkIcon className="size-4" />
                </Button>
              )
            }
            title={filesList}
            className="cursor-pointer truncate text-start"
            {...props}
          >
            {filesList || t("nav.choose_file")}
          </Input>
        )}
      </Upload>
    </div>
  );
};

export { CoverImageUpload };
