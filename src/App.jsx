import { useState } from 'react'
import TextDisplay from "./components/TextDisplay"
import TextEditor from "./components/TextEditor"

function App (){
    const [text,setText] = useState("");
    const [isEnglish, setIsEnglish] = useState(false);

    const handleKey = (char) => {
        setText((prev) => prev + char);
    };

    const toggleLanguage = () => {
    setIsEnglish(prev => !prev);
    };

    return (
        <div className="app">
          <TextDisplay text={text} />
          <TextEditor onKeyPress={handleKey} isEnglish={isEnglish} />
          <button onClick={toggleLanguage}>
            {isEnglish ? "עבור לעברית" : "Switch to English"}
          </button>

        </div>
    );
}

export default App;