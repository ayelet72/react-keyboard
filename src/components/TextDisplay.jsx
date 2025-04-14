import React from "react";

function TextDisplay({ text }) {
  return (
    <div className="text-Holder">
      <h2 className="h2-text-disply">תצוגת טקסט:</h2>
      <p className="text-disply">{text}</p>
    </div>
  );
}

export default TextDisplay;