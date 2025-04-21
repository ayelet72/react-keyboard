import React,{ useState,useEffect } from "react";


function TextFileManager({onSave, onLoad } ){
    const [fileName, setFileName] = useState("");
    const [savedFiles, setSavedFiles] = useState([]);

    // טען את רשימת הקבצים הקיימים ב-localStorage
    useEffect(() => {
        const files = Object.keys(localStorage);
        setSavedFiles(files);
    }, []);

    const handleSave = () => {
        let nameToSave = fileName;
        
        if (!nameToSave) {
            nameToSave = prompt("הכניסי שם לקובץ:");
            if (!nameToSave) {
            alert("שמירה בוטלה – אין שם קובץ");
            return;
            }
            setFileName(nameToSave);
        }
        
        onSave(nameToSave);
        
        if (!savedFiles.includes(nameToSave)) {
            setSavedFiles((prev) => [...prev, nameToSave]);
        }
    };
      
    
    const handleLoad = () => {
    if (!fileName) {
        alert("יש לבחור קובץ לטעינה");
        return;
    }
    onLoad(fileName);
    };

    return (
    <div className="file-manager">
        <h3>  שמירה / פתיחת קובץ  </h3>
        {/* <input
        type="text"
        placeholder="שם קובץ"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        /> */}

        <div className="file-buttons">
        <button onClick={handleSave}>💾 שמור</button>
        <button onClick={handleLoad}>📂 פתח</button>
        </div>

        {savedFiles.length > 0 && (
        <div className="saved-files">
            <label>בחר קובץ קיים:</label>
            <select onChange={(e) => setFileName(e.target.value)} value={fileName} >
            <option value="">-- קבצים שמורים --</option>
            {savedFiles.map((name) => (
                <option key={name} value={name}>
                {name}
                </option>
            ))}
            </select>
        </div>
        )}
    </div>
    );
}
    
    export default TextFileManager;
