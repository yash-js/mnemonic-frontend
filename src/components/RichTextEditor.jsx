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
  }, [quill, setValue, quillRef]);

  {/**useEffect(() => {
    return () => (quill && value && value.length > 0 ? value : "<p><br></p>");
  }, [quill]);**/}

  return (
    <div>
      <div style={{ width: "100%", height: "calc(100% - 42px)" }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default RichTextEditor;
