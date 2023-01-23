import React, { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 

function RichTextEditor() {
  const { quill, quillRef } = useQuill();
  const [value,setValue]=useState();

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setValue(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  useEffect(() => {
    return () => {
      localStorage.setItem(
        "notedata",
        JSON.stringify(value)
      );
    };
  }, [value]);

  return(
      <div>
          <div style={{ width: '100%', height: 'calc(100% - 42px)' }}>
              <div ref={quillRef} />
          </div>
      </div>
  );
}

export default RichTextEditor;
