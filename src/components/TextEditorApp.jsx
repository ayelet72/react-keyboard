import { useState } from 'react';
import TextDisplay from "./TextDisplay/TextDisplay";
import TextStylePanel from "./TextStylePanel/TextStylePanel";
import VirtualKeyboard from "./VirtualKeyboard";
import TextActionsPanel from "./TextActionsPanel/TextActionsPanel";

function TextEditorApp() {
  const [text, setText] = useState("");
  const [currentStyle, setCurrentStyle] = useState({
    fontFamily: "Arial",
    fontSize: "12px",
    color: "#000000",
  });
  const [styleSpans, setStyleSpans] = useState([]);

  //תיקון טווחי עיצוב לאחר שינוי
  const adjustStyleSpansAfterTextChange = (newLength) => {
    setStyleSpans((prev) =>
      prev
        .map((span) => {
          if (span.end > newLength) {
            if (span.start >= newLength) return null;
            return { ...span, end: newLength };
          }
          return span;
        })
        .filter(Boolean)
    );
  };

  const handleKey = (char) => {
    const start = text.length;
    const end = start + 1;
    setText((prev) => prev + char);

    setStyleSpans((prev) => {
      const last = prev[prev.length - 1];
      if (
        last &&
        last.end === start &&
        JSON.stringify(last.style) === JSON.stringify(currentStyle)
      ) {
        const updated = [...prev];
        updated[updated.length - 1] = { ...last, end };
        return updated;
      }
      return [...prev, { start, end, style: currentStyle }];
    });
  };

  const handleDelete = () => {
    const newLength = text.length - 1;
    setText((prev) => prev.slice(0, -1));
    adjustStyleSpansAfterTextChange(newLength);
  };

  const handleDeleteWord = () => {
    const lastSpace = text.trimEnd().lastIndexOf(" ");
    const newText = lastSpace === -1 ? "" : text.slice(0, lastSpace + 1);
    setText(newText);
    adjustStyleSpansAfterTextChange(newText.length);
  };

  const handleClearText = () => {
    setText("");
    adjustStyleSpansAfterTextChange(0);
  };

  const handleStyleChange = (key, value) => {
    const newStyle = { [key]: value };
    setCurrentStyle((prev) => ({ ...prev, ...newStyle }));
  };

  const handleApplyAll = () => {
    setStyleSpans([
      { start: 0, end: text.length, style: currentStyle }
    ]);
  };

  const handleUndo = () => {
    // נשלים בהמשך עם stack של פעולות
  };

  const handleSearchChar = (char) => {
    if (!char) return;
    const index = text.indexOf(char);
    if (index === -1) {
      alert(`התו "${char}" לא נמצא`);
    } else {
      alert(`התו "${char}" מופיע במיקום ${index}`);
    }
  };

  const handleReplaceChar = (oldChar, newChar) => {
    if (!oldChar || !newChar) return;
    const updatedText = text.replaceAll(oldChar, newChar);
    setText(updatedText);
  };

  return (
    <div>
      <TextDisplay text={text} styleSpans={styleSpans} />

      <div className="editor-area flex">
        <TextActionsPanel
          onDeleteWord={handleDeleteWord}
          onClearText={handleClearText}
          onUndo={handleUndo}
          onSearchChar={handleSearchChar}
          onReplaceChar={handleReplaceChar}
        />

        <VirtualKeyboard
          onKeyPress={handleKey}
          onDelete={handleDelete}
        />

        <TextStylePanel
          onStyleChange={handleStyleChange}
          onApplyAll={handleApplyAll}
          currentStyle={currentStyle}
        />
      </div>
    </div>
  );
}

export default TextEditorApp;
