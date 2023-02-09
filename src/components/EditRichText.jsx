import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function EditRichText({ setValue, value }) {
  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill) {
      // quillRef.current
      if (value && value.length > 0) {
        quill.root.innerHTML = value;
      }
      quill.on("text-change", () => {
        setValue(quill.root.innerHTML);
      });
    }
  }, [quill, quillRef, value]);

  return (
    <div>
      <div style={{ width: "100%", height: "calc(100% - 42px)" }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default EditRichText;
