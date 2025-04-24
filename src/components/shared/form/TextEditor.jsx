// Import Dependencies
import PropTypes from "prop-types";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import clsx from "clsx";
import Quill from "quill";

import quillCSS from "quill/dist/quill.snow.css?inline";

// Local Imports
import { InputErrorMsg } from "components/ui";
import { useUncontrolled } from "hooks";
import {
  injectStyles,
  insertStylesToHead,
  makeStyleTag,
} from "utils/dom/injectStylesToHead";

// ----------------------------------------------------------------------

const styles = `@layer vendor {
  ${quillCSS} 
}`;

const sheet = makeStyleTag();

injectStyles(sheet, styles);
insertStylesToHead(sheet);

const Delta = Quill.import("delta");
const DEFAULT_PLACEHOLDER = "Type here...";

const TextEditor = forwardRef(
  (
    {
      readOnly,
      value,
      defaultValue,
      onTextChange,
      onSelectionChange,
      onChange,
      placeholder,
      modules,
      className,
      error,
      classNames,
      label,
    },
    forwardedRef,
  ) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    const [_value, handleChange] = useUncontrolled({
      value,
      defaultValue,
      finalValue: new Delta(),
      onChange,
    });

    const onChangeRef = useRef(handleChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      onChangeRef.current = handleChange;
    }, [handleChange, onSelectionChange, onTextChange]);

    useEffect(() => {
      const container = containerRef.current;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );

      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder: placeholder || DEFAULT_PLACEHOLDER,
        modules: modules || {},
      });

      quill.enable(!readOnly);

      quill.setContents(_value);

      quillRef.current = quill;

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        const [, , source] = args;
        if (source === "user") {
          const newContent = quill.getContents();
          onChangeRef?.current(newContent, quill);
          onTextChangeRef.current?.(...args);
        }
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        quill.off(Quill.events.TEXT_CHANGE);
        quill.off(Quill.events.SELECTION_CHANGE);
        quillRef.current = null;
        container.innerHTML = "";
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readOnly, modules, placeholder]);

    useImperativeHandle(forwardedRef, () => ({
      getQuillInstance: () => quillRef.current,
      blur: () => quillRef.current.blur(),
      focus: () => quillRef.current.focus(),
      hasFocus: () => quillRef.current.hasFocus(),
    }));

    useEffect(() => {
      if (quillRef.current && value !== undefined) {
        const currentContent = quillRef.current.getContents();

        const diff = currentContent.diff(value);

        if (diff && diff?.ops?.length > 0) {
          quillRef.current.setContents(value);
        }
      }
    }, [quillRef, value]);

    return (
      <div
        className={clsx(
          "flex flex-col",
          className,
          error && "ql-error",
          classNames?.root,
        )}
      >
        {label && <label>{label}</label>}
        <div
          className={clsx(
            "ql-container",
            label && "mt-1.5!",
            classNames?.container,
          )}
          ref={containerRef}
        ></div>

        <InputErrorMsg
          when={error && typeof error !== "boolean"}
          className={classNames?.error}
        >
          {error}
        </InputErrorMsg>
      </div>
    );
  },
);

TextEditor.displayName = "TextEditor";

TextEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  modules: PropTypes.object,
  children: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  className: PropTypes.string,
  classNames: PropTypes.object,
  label: PropTypes.node,
};

export { TextEditor, Delta, Quill };
