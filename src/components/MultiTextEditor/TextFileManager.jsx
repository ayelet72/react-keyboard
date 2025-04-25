import React, { useState, useEffect } from "react";

function TextFileManager({ onSave, onLoad, currentUserId,savedFiles, setSavedFiles}) {
  const [fileName, setFileName] = useState("");
  // const [savedFiles, setSavedFiles] = useState([]);

  // טען רק את הקבצים של המשתמש הנוכחי
  useEffect(() => {
    const allFiles = JSON.parse(localStorage.getItem("my_text_editor_files") || "[]");
    const userFiles = allFiles.filter(file => file.ownerId === currentUserId);
    setSavedFiles(userFiles);
  }, [currentUserId]);

  // שמירה
  const handleSave = () => {
    console.log("תחילת תהליך שמירה");
    let nameToSave = fileName;
    console.log("שם הקובץ:"+nameToSave);

    if (!nameToSave) {
      nameToSave = prompt("הכניסי שם לקובץ:");
      if (!nameToSave) return;
      setFileName(nameToSave);
    }

    const allFiles = JSON.parse(localStorage.getItem("my_text_editor_files") || "[]");

    // הסרה של קובץ ישן בשם הזה (אם קיים)
    const updatedFiles = allFiles.filter(
      file => !(file.ownerId === currentUserId && file.name === nameToSave)
    );

    const newFile = {
      name: nameToSave,
      ownerId: currentUserId,
      data: onSave(nameToSave), // הפונקציה מחזירה את תוכן הקובץ
    };


    updatedFiles.push(newFile);
    localStorage.setItem("my_text_editor_files", JSON.stringify(updatedFiles));

    // עדכון הרשימה המקומית
    setSavedFiles(updatedFiles.filter(file => file.ownerId === currentUserId));
    console.log("הרשימת קבצים המקומית: ");
    alert(`'${nameToSave}' נשמר בהצלחה!`);
  };

  // טעינה
  const handleLoad = () => {
    const file = savedFiles.find(f => f.name === fileName);
    if (!file) {
      alert("הקובץ לא נמצא");
      return;
    }

    console.log(JSON.stringify(file.data));
    onLoad(file.data);
  };

  return (
    <div className="file-manager">
      <h3>שמירה / פתיחת קובץ</h3>

      <div className="file-buttons">
        <button onClick={handleSave}>💾 שמור</button>
        <button onClick={handleLoad}>📂 פתח</button>
      </div>

      {savedFiles.length > 0 && (
        <div className="saved-files">
          <label>בחר קובץ קיים:</label>
          <select
            onChange={(e) => setFileName(e.target.value)}
            value={fileName}
          >
            <option value="">-- קבצים שמורים --</option>
            {savedFiles.map((file) => (
              <option key={file.name} value={file.name}>
                {file.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default TextFileManager;
