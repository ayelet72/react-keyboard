import { useState } from 'react';
import TextDisplay from "./TextDisplay/TextDisplay";
import TextStylePanel from "./TextStylePanel/TextStylePanel";
import VirtualKeyboard from "./Keyboard/VirtualKeyboard";
import TextActionsPanel from "./TextActionsPanel/TextActionsPanel";

function TextEditorApp() {
  const [text, setText] = useState("");
  const [currentStyle, setCurrentStyle] = useState({
    fontFamily: "Arial",
    fontSize: "12px",
    color: "#000000",
  });
  const [styleSpans, setStyleSpans] = useState([]);
  const [searchChar, setSearchChar] = useState(null);


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
    if (searchChar !== null) {
      setSearchChar(null);
    }

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
    if (searchChar !== null) {
      setSearchChar(null);
    }
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

    if (char!=null &&!text.includes(char)) {
      alert(`התו "${char}" לא נמצא בטקסט`);
      return;
    }

    setSearchChar(char);
  };



  const handleReplaceChar = (oldChar, newChar) => {
    if (!oldChar || !newChar) return;
    const updatedText = text.replaceAll(oldChar, newChar);
    setText(updatedText);
  };

  return (
    <div>
      <TextDisplay text={text} styleSpans={styleSpans} searchChar={searchChar} />

      <div className="editor-area flex">
        <div className="Action-erea">
          <TextActionsPanel
            onDeleteWord={handleDeleteWord}
            onClearText={handleClearText}
            onUndo={handleUndo}
            onSearchChar={handleSearchChar}
            onReplaceChar={handleReplaceChar}
            searchChar={searchChar}
          />
        </div>


        <div className="keyboard-erea" >
          <VirtualKeyboard
            onKeyPress={handleKey}
            onDelete={handleDelete}
          />
        </div>


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
