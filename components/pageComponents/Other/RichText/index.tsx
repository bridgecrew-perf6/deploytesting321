import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";

interface RichTextEditor {
  countChar: (charLength: number) => void;
}

const RichTextEditor = ({ countChar }: RichTextEditor) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const textVal: string = convertToRaw(state.getCurrentContent()).blocks[0]
      .text;
    countChar(textVal.length);
  };

  const uploadImageCallBack = (file: any) => {
    console.log(file);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={handleEditorChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          fontSize: { icon: 16 },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            // alt: { present: true, mandatory: false },
          },
        }}
      />
    </div>
  );
};

export default RichTextEditor;
