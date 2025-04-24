import React from "react";
import "./TextDisplay.css";


export function highlightTextSegment(segment, style, searchChar, spanIndex) {
  const parts = [];
  let cursor = 0;

  for (let i = 0; i < segment.length; i++) {
    const char = segment[i];

    if (char === searchChar) {
      if (i > cursor) {
        parts.push(
          <span key={`${spanIndex}-before-${i}`} style={style}>
            {segment.slice(cursor, i)}
          </span>
        );
      }

      
      parts.push(
        <span
          key={`${spanIndex}-match-${i}`}
          style={{ ...style, backgroundColor: "yellow" }}
        >
          {char}
        </span>
      );

      cursor = i + 1; 
    }
  }

  if (cursor < segment.length) {
    parts.push(
      <span key={`${spanIndex}-after`} style={style}>
        {segment.slice(cursor)}
      </span>
    );
  }

  return parts;
}

function TextDisplay({ text, styleSpans, searchChar }) {
  const elements = [];

  if (!searchChar) {
    styleSpans.forEach(({ start, end, style }, i) => {
      const segment = text.slice(start, end);
      elements.push(
        <span key={`plain-${i}`} style={style}>
          {segment}
        </span>
      );
    });
  } else {
    styleSpans.forEach(({ start, end, style }, i) => {
      const segment = text.slice(start, end);
      const highlighted = highlightTextSegment(segment, style, searchChar, i);
      elements.push(...highlighted);
    });
  }

  return (
    <div className="text-wrapper">
      <div className="text-display">{elements}</div>
    </div>
  );
}


export default TextDisplay;
