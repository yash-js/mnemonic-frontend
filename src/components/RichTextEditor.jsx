import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function RichTextEditor({ setValue, value }) {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      if (value && value.length > 0) {
        quill.root.innerHTML = value;
      } 
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, setValue, quillRef]);

  // useEffect(() => {
  //     if (quill && value && value.length > 0) {
  //         quillRef?.current?.firstChild?.innerHTML = value
  //     }
  // }, [quill]);

  return (
    <div>
      <div style={{ width: "100%", height: "calc(100% - 42px)" }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default RichTextEditor;
