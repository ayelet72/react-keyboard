import React from "react";
import "./TextStylePanel.css";

const fontOptions = ["Arial", "Times New Roman", "David", "Courier New", "Verdana", "Tahoma"];
const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];

function TextStylePanel({ onStyleChange, onApplyAll, currentStyle }) {
  return (
    <div className="style-panel">
      <label>
        <select onChange={(e) => onStyleChange("fontFamily", e.target.value)}>
          {fontOptions.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        :גופן
      </label>

      <label>
        <select onChange={(e) => onStyleChange("fontSize", e.target.value)}>
          {fontSizes.map((size) => (
            <option key={size} value={size}>{parseInt(size)}</option>
          ))}
        </select>
        :גודל
      </label>

      <label>
        <input
          type="color"
          onChange={(e) => onStyleChange("color", e.target.value)}
        />
        :צבע
      </label>

      <div className="style-buttons">
        <button
          className={currentStyle.fontWeight === "bold" ? "active" : ""}
          onClick={() => onStyleChange("fontWeight", currentStyle.fontWeight === "bold" ? undefined : "bold")}
        >
          B
        </button>

        <button
          className={currentStyle.fontStyle === "italic" ? "active" : ""}
          onClick={() => onStyleChange("fontStyle", currentStyle.fontStyle === "italic" ? undefined : "italic")}
        >
          I
        </button>

        <button
          className={currentStyle.textDecoration === "underline" ? "active" : ""}
          onClick={() => onStyleChange("textDecoration", currentStyle.textDecoration === "underline" ? undefined : "underline")}
        >
          U
        </button>
      </div>

      <div className="apply-toggle">
        <button onClick={onApplyAll}>
          החל עיצוב על הכל 
        </button>
      </div>
    </div>
  );
}

export default TextStylePanel;
