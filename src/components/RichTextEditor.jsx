import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function RichTextEditor({ setValue, value }) {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, setValue, quillRef, value]);

  useEffect(() => {
    if (quill) {
      if (value && value.length > 0)
        return (quillRef.current.firstChild.innerHTML = value);
      else {
        return (quillRef.current.firstChild.innerHTML = "<p><br></p>");
      }
    }
  }, [quill]);

  return (
    <div>
      <div style={{ width: "100%", height: "calc(100% - 42px)" }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default RichTextEditor;
