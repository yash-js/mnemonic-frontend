import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { useRichTextEditor } from '../hooks/richtexteditor';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RichTextEditor() {
  const {
    richtextdata,
    setRichtextdata
  } = useRichTextEditor()

  return (
    <div className='richtexteditor'>
        <Editor
          editorState={richtextdata}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={(e) => setRichtextdata(e)}
        />
    </div>
  )
}

export default RichTextEditor