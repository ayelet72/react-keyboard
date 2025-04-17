import React, { useState } from "react";
import "./keyboard.css"

function VirtualKeyboard({ onKeyPress, onDelete }) {
  const [showSymbols, setShowSymbols] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false); 

  const baseKeys = {
    en: [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "←"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "⏎"],
      ["Z", "X", "C", "V", "B", "N", "M", ",", "."],
    ],
    he: [
      ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "י", "ו", "←"],
      ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", ",", "⏎"],
      ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "."],
    ],
  };

  const symbols = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"],
    ["?", "'","[", "]", "{", "}", "\\", "|", "/", "=", "~"]
  ];

  const langKey = isEnglish ? "en" : "he";
  const currentKeys = showSymbols ? symbols : baseKeys[langKey];

  return (
    <div className="keys-holder">
      {currentKeys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((char, i) => (
            <button
              key={i}
              onClick={() => {
                if (char === "←") onDelete();
                else if (char === "⏎") onKeyPress("\n");
                else onKeyPress(char);
              }}
              className="key-button"
            >
              {char}
            </button>
          ))}
        </div>
      ))}

      <div className="keyboard-row">
        <button onClick={() => setShowSymbols(prev => !prev)}>
          {!showSymbols ? "&123" : !isEnglish ? "אבג" : "ABC"}
        </button>

        <button onClick={() => onKeyPress(" ")}>______________</button>

        {!showSymbols && (
          <button onClick={() => setIsEnglish(prev => !prev)}>
            {isEnglish ? "עברית" : "Eng"}
          </button>
        )}
      </div>
    </div>
  );
}

export default VirtualKeyboard;
