import React from "react";
import VirtualKeyboard from "./VirtualKeyboard";

function TextEditor({ onKeyPress,isEnglish }) {
  return (
    <div className="div-Editor">
      <h2 className="h2-Editor">אזור עריכה:</h2>
      <VirtualKeyboard onKeyPress={onKeyPress} isEnglish={isEnglish}/>
    </div>
  );
}

export default TextEditor;
