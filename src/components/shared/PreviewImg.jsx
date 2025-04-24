// Import Dependencies
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

export function PreviewImg({ file, src, alt, ...rest }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    try {
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      console.error(err);
      setPreviewUrl(null);
    }

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <img
      src={previewUrl || src}
      onLoad={() => URL.revokeObjectURL(previewUrl)}
      alt={alt}
      {...rest}
    />
  );
}

PreviewImg.propTypes = {
  file: PropTypes.object,
  src: PropTypes.string,
  alt: PropTypes.string,
};
