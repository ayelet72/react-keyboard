import "./TextActionsPanel.css";

import React from "react";

function TextActionsPanel({
    onDeleteWord,
    onClearText,
    onUndo,
    onSearchChar,
    onReplaceChar
}) {
    return (
        <div className="actions-panel">

            <div className="action-raw1 flex">
                <button onClick={onUndo}>↩️</button>
                <button onClick={onDeleteWord}>מחק מילה</button>
                <button onClick={onClearText}>מחק הכל</button>
            </div>
            <div className="action-raw2 flex">
                <button onClick={() => {
                    const val = document.getElementById("searchChar").value;
                    onSearchChar(val);
                }}>
                    🔍
                </button>
                <input type="text" placeholder="תו לחיפוש" maxLength={1} id="searchChar" />

            </div>

            <div className="action-raw3 flex">

                <button onClick={() => {
                    const oldChar = document.getElementById("oldChar").value;
                    const newChar = document.getElementById("newChar").value;
                    onReplaceChar(oldChar, newChar);
                }}>
                    החלף 
                </button>
                <div>
                    <input type="text" placeholder="ישן" maxLength={1} id="oldChar" />
                    <input type="text" placeholder="חדש" maxLength={1} id="newChar" />
                </div>
            </div>
        </div>
    );
}

export default TextActionsPanel;
