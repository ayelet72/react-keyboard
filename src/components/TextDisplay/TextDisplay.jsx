import React from "react";
import "./TextDisplay.css";


function TextDisplay({ text, styleSpans }) {
  const elements = [];

  styleSpans.forEach(({ start, end, style }) => {
    elements.push(
      <span style={style}>
        {text.slice(start, end)}
      </span>

    );
  });

  return <div className="text-display">{elements}</div>;
}


export default TextDisplay;
