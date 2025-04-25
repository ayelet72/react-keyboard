import React, { useState } from "react";
import "./AuthForms.css";

function LoginForm({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("נא למלא את כל השדות");
      return;
    }
    onLogin(username, password);
  };

  return (
    <div className="auth-form">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button type="submit">התחבר</button>
      </form>
      <p>
        אין לך חשבון עדיין? {" "}
        <button type="button" onClick={onSwitchToRegister}>
          הירשם
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
