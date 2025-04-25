import React, { useState } from "react";
import "./AuthForms.css";

function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(username+" "+password+" "+confirmPassword);
    // if (!username || !password || !confirmPassword) {
    //     console.log("עברתי את התנאי");
    //   alert("יש למלא את כל השדות");
    //   return;
    // }

    if (password !== confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }

    console.log("קריאה לפונק רישום");
    console.log("שם משתמש"+username);
    console.log("סיסמא"+password);


    onRegister(username, password);
  };

  return (
    <div className="auth-form" dir="rtl">
      <h2>הרשמה</h2>
      <form onSubmit={handleSubmit} id="regForm">
        <input
        id="reg-usermane"
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={4}
          maxLength={20}
        />
        <input
        id="log-username"
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           required
        />
        <input
        id="reg-password"
          type="password"
          placeholder="אימות סיסמה"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">הירשם</button>
      </form>

      {/* מחוץ ל־form כדי למנוע שליחה בטעות */}
      <p>
        כבר יש לך חשבון?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          התחבר
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;
