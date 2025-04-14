import React from "react";

function VirtualKeyboard({ onKeyPress,isEnglish }) {
  
    const keysHeb = ["א", "ב", "ג", "ד", "ה"];
    const keysEng = ["A", "B", "C", "D", "E"];
    const keys  = isEnglish ? keysEng : keysHeb;

    return (
        <div className="keys-holder">
            {keys.map((char, index) => (
            <button
                key={index}
            onClick={() => onKeyPress(char)}
            className="key-button"> {char} </button> 
            ))}
        </div>
    );
}

export default VirtualKeyboard;
