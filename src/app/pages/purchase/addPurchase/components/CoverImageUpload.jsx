// Import Dependencies
import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/24/solid";

// Local Imports
import { Upload, Button, Input } from "components/ui";

// ----------------------------------------------------------------------

const CoverImageUpload = ({ label, value = [], onChange }) => {
  const uploadRef = useRef();

  const filesList =
    value.length > 0
      ? value.map((file) => file.name || file).join(", ")
      : "Choose Files";

  const handleFileChange = (newFiles) => {
    // newFiles could be FileList or array
    onChange(Array.from(newFiles)); // ensure array of File objects
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
            {filesList}
          </Input>
        )}
      </Upload>
    </div>
  );
};

export { CoverImageUpload };
