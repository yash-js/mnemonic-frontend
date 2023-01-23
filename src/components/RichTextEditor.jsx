import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";

function RichTextEditor() {
  let editorState = EditorState.createEmpty();
  const [richtextdata, setRichtextdata] = useState(editorState);
  const savedata = localStorage.getItem("notedata")
    ? JSON.parse(localStorage.getItem("notedata"))
    : richtextdata;
  // const draftdata = htmlToDraft(savedata);

  const onEditorStateChange = (editorState) => {
    setRichtextdata(editorState);
  };

  useEffect(() => {
    return () => {
      localStorage.setItem(
        "notedata",
        JSON.stringify(
          draftToHtml(convertToRaw(richtextdata.getCurrentContent()))
        )
      );
    };
  }, [richtextdata]);

  return (
    <div className="richtexteditor">
      <Editor
        editorState={richtextdata}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

export default RichTextEditor;
