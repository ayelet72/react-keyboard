// MultiTextEditorApp.jsx (מבוסס על TextEditorApp + שדרוג לחלק ג׳)
import React, { useState } from 'react';
import TextDisplay from "../TextDisplay/TextDisplay";
import TextStylePanel from "../TextStylePanel/TextStylePanel";
import VirtualKeyboard from "../Keyboard/VirtualKeyboard";
import TextActionsPanel from "../TextActionsPanel/TextActionsPanel";
import TextFileManager from "./TextFileManager";
import "../MultiTextEditor/MultiTextEditorApp.css";

let nextId = 1;
const firstEditor = createNewEditor("קובץ 1");


function MultiTextEditorApp({ currentUser, onLogout }) {
  // DATA
  const [editors, setEditors] = useState([firstEditor]);
  //which one we are editing now 
  const [activeEditorId, setActiveEditorId] = useState(firstEditor.id);

  const [savedFiles, setSavedFiles] = useState([]);

  const [currentStyle, setCurrentStyle] = useState({
    fontFamily: "Arial",
    fontSize: "12px",
    color: "#000000",
  });


  // HELPERS
  const updateEditor = (id, updates) => {
    setEditors(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };


  // //the active erea is set only when there are editors:
  // React.useEffect(() => {
  //   if (editors.length > 0 && activeEditorId === null) {
  //     setActiveEditorId(editors[0].id);
  //   }
  // }, [editors, activeEditorId]);

  const pushToHistory = (id) => {
    setEditors((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
            ...e,
            history: [
              ...e.history.slice(-49),
              {
                text: e.text,
                styleSpans: e.styleSpans,
                currentStyle: e.currentStyle,
                searchChar: e.searchChar,
              },
            ],
          }
          : e
      )
    );
  };

  const adjustStyleSpansAfterTextChange = (editor, newLength) => {
    return editor.styleSpans
      .map((span) => {
        if (span.end > newLength) {
          if (span.start >= newLength) return null;
          return { ...span, end: newLength };
        }
        return span;
      })
      .filter(Boolean);
  };

  // ACTIONS
  const handleKey = (id, char) => {
    const editor = editors.find(e => e.id === id);
    pushToHistory(id);
    if (editor.searchChar !== null) updateEditor(id, { searchChar: null });
    const start = editor.text.length;
    const end = start + 1;
    const newSpans = [...editor.styleSpans];
    const last = newSpans[newSpans.length - 1];
    if (last && last.end === start && JSON.stringify(last.style) === JSON.stringify(editor.currentStyle)) {
      newSpans[newSpans.length - 1] = { ...last, end };
    } else {
      newSpans.push({ start, end, style: /*editor.*/currentStyle });
    }
    updateEditor(id, { text: editor.text + char, styleSpans: newSpans });
  };

  const handleDelete = (id) => {
    const editor = editors.find(e => e.id === id);
    pushToHistory(id);
    if (editor.searchChar !== null) updateEditor(id, { searchChar: null });
    const newText = editor.text.slice(0, -1);
    const newSpans = adjustStyleSpansAfterTextChange(editor, newText.length);
    updateEditor(id, { text: newText, styleSpans: newSpans });
  };

  const handleDeleteWord = (id) => {
    const editor = editors.find(e => e.id === id);
    pushToHistory(id);
    if (editor.searchChar !== null) updateEditor(id, { searchChar: null });
    const trimmedText = editor.text.trimEnd();
    const lastSeparator = Math.max(trimmedText.lastIndexOf(" "), trimmedText.lastIndexOf("\n"));
    const newText = lastSeparator === -1 ? "" : editor.text.slice(0, lastSeparator + 1);
    updateEditor(id, { text: newText, styleSpans: adjustStyleSpansAfterTextChange(editor, newText.length) });
  };

  const handleClearText = (id) => {
    pushToHistory(id);
    updateEditor(id, { text: "", styleSpans: [], searchChar: null });
  };

  // const handleStyleChange = (id, key, value) => {
  //   const editor = editors.find(e => e.id === id);
  //   const newStyle = { ...editor.currentStyle, [key]: value };
  //   updateEditor(id, { currentStyle: newStyle });
  // };

  const handleStyleChange = (id, key, value) => {
    setCurrentStyle(prev => ({ ...prev, [key]: value }));
  };
  //________________________________________________________________
  

  const handleApplyAll = (id) => {
    const editor = editors.find(e => e.id === id);
    pushToHistory(id);
    updateEditor(id, {
      styleSpans: [{ start: 0, end: editor.text.length, style: /*editor.*/currentStyle }],
    });
  };

  const handleUndo = (id) => {
    const editor = editors.find(e => e.id === id);
    const history = editor.history || [];
    if (history.length === 0) return;
    const last = history[history.length - 1];
    updateEditor(id, {
      text: last.text,
      styleSpans: last.styleSpans,
      currentStyle: last.currentStyle,
      searchChar: last.searchChar,
      history: history.slice(0, -1),
    });
  };

  const handleSearchChar = (id, char) => {
    const editor = editors.find(e => e.id === id);
    if (char && !editor.text.includes(char)) {
      alert(`התו "${char}" לא נמצא בטקסט`);
      return;
    }
    pushToHistory(id);
    updateEditor(id, { searchChar: char });
  };

  const handleReplaceChar = (id, oldChar, newChar) => {
    if (!oldChar || !newChar) return;
    pushToHistory(id);
    const editor = editors.find(e => e.id === id);
    const updatedText = editor.text.replaceAll(oldChar, newChar);
    updateEditor(id, { text: updatedText });
  };

  // const handleSave = (id, fileName) => {
  //   console.log("שמירת קובץ");
  //   const editor = editors.find(e => e.id === id);
  //   const fileData = { text: editor.text, styleSpans: editor.styleSpans };

  //   const allFiles = JSON.parse(localStorage.getItem("my_text_editor_files") || "[]");

  //   const updatedFiles = allFiles.filter(file =>
  //     !(file.ownerId === currentUser.id && file.name === fileName)
  //   );

  //   console.log(fileData);

  //   updatedFiles.push({
  //     name: fileName,
  //     ownerId: currentUser.id,
  //     data: fileData,
  //   });

  //   localStorage.setItem("my_text_editor_files", JSON.stringify(updatedFiles));
  //   alert("הקובץ נשמר בהצלחה");
  // };


  // const handleLoad = (id, fileName) => {
  //   const allFiles = JSON.parse(localStorage.getItem("my_text_editor_files") || "[]");
  //   const file = allFiles.find(file => file.ownerId === currentUser.id && file.name === fileName);

  //   if (file) {
  //     updateEditor(id, {
  //       text: file.data.text,
  //       styleSpans: file.data.styleSpans || [],
  //     });
  //     alert("הקובץ נטען בהצלחה");
  //   } else {
  //     alert("הקובץ לא נמצא או שאינו שייך למשתמש הנוכחי");
  //   }
  // };


  const addNewEditor = () => {
    if (editors.length >= 4) return;
    const newEditor = createNewEditor(`קובץ ${editors.length + 1}`);
    setEditors(prev => [...prev, newEditor]);
  };

  const handleCloseEditor = (id) => {
    const confirmClose = window.confirm(
      "⚠️ שים לב: אם לא שמרת את הקובץ, הנתונים עלולים להימחק.\n\nהאם אתה בטוח שברצונך לסגור את אזור העריכה?"
    );
    
    if (!confirmClose) return;
    

    setEditors(prev => {
      const filtered = prev.filter(e => e.id !== id);
      const renamed = filtered.map((editor, index) => ({
        ...editor,
        name: `קובץ ${index + 1}`
      }));

      // עדכון activeEditorId אם צריך
      if (id === activeEditorId) {
        setActiveEditorId(renamed.length > 0 ? renamed[0].id : null);
      }

      return renamed;
    });
  };



  // RENDER
  return (
    <div className='editor-page'>
      <div className="editor-header">
        <button className="logout-btn" onClick={onLogout}> התנתק</button>
        <span className="greeting">שלום, {currentUser.username}</span>
      </div>

      {editors.length < 4 && (
        <button className="add-editor-btn" onClick={addNewEditor}>
          ➕ הוסף אזור עריכה
        </button>
      )}

      {/* הצגת כל העורכים */}
      <div className={`editor-container ${classNameByCount(editors.length)}`}>
        {editors.map((editor) => (

          <div
            key={editor.id}
            className={`editor-box ${editor.id === activeEditorId ? "active-editor" : ""}`}
            onClick={() => setActiveEditorId(editor.id)}
          >
            <button className="close-editor-btn"
              onClick={(e) => {
                e.stopPropagation(); // מונע לחיצה כפולה שגורמת לשינוי active
                handleCloseEditor(editor.id);
              }}
            > ❌ </button>
            <h3>{editor.name} {editor.id === activeEditorId && "🟢 פעיל"}</h3>
            <div className="text-erea">
              <TextDisplay
                text={editor.text}
                styleSpans={editor.styleSpans}
                searchChar={editor.searchChar}
              />
              <TextFileManager
                savedFiles={savedFiles}
                setSavedFiles={setSavedFiles}
                currentUserId={currentUser.id}
                onSave={() => ({
                  text: editor.text,
                  styleSpans: editor.styleSpans
                })}
                onLoad={(data) => updateEditor(editor.id, {
                  text: data.text,
                  styleSpans: data.styleSpans || []
                })}
              />


            </div>
          </div>
        ))}
      </div>

      {/* פאנל כלים גלובלי לעורך הפעיל בלבד */}
      {activeEditorId && (
        <div className="editor-area">

          <div className="Action-erea">
            <TextActionsPanel
              onDeleteWord={() => handleDeleteWord(activeEditorId)}
              onClearText={() => handleClearText(activeEditorId)}
              onUndo={() => handleUndo(activeEditorId)}
              onSearchChar={(char) => handleSearchChar(activeEditorId, char)}
              onReplaceChar={(o, n) => handleReplaceChar(activeEditorId, o, n)}
              searchChar={editors.find(e => e.id === activeEditorId)?.searchChar}
            />
          </div>

          <div className="keyboard-erea">
            <VirtualKeyboard
              onKeyPress={(char) => handleKey(activeEditorId, char)}
              onDelete={() => handleDelete(activeEditorId)}
            />
          </div>

          <TextStylePanel className="style-panel"
            onStyleChange={(k, v) => handleStyleChange(activeEditorId, k, v)}
            onApplyAll={() => handleApplyAll(activeEditorId)}
            currentStyle={/*editors.find(e => e.id === activeEditorId)?.*/currentStyle}
          />
        </div>
      )}
    </div>
  );
}

function createNewEditor(name) {
  return {
    id: nextId++,
    name,
    text: "",
    styleSpans: [],
    searchChar: null,
    // currentStyle: {
    //   fontFamily: "Arial",
    //   fontSize: "12px",
    //   color: "#000000",
    // },
    history: [],
  };
}

function classNameByCount(count) {
  switch (count) {
    case 2: return "two-editors";
    case 3: return "three-editors";
    case 4: return "four-editors";
    default: return "";
  }
}

export default MultiTextEditorApp;
