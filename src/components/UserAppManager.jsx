// UserAppManager.jsx
import React, { useState, useEffect } from "react";
import MultiTextEditorApp from "./MultiTextEditorApp";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LOCAL_STORAGE_KEY = "my_text_editor_users";

function UserAppManager() {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [mode, setMode] = useState("login"); // "login" | "register" | "editor"

  // Save users on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const handleRegister = (username, password, confirmPassword) => {
   
    if (users.some((u) => u.username === username)) {
      alert("שם משתמש כבר קיים");
      return;
    }
    const newUser = { username, password, files: [] };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setMode("editor");
  };

  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
      alert("פרטי התחברות שגויים");
      return;
    }
    setCurrentUser(user);
    setMode("editor");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMode("login");
  };

  if (mode === "login") {
    return <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setMode("register")} />;
  }

  if (mode === "register") {
    return <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setMode("login")} />;
  }

  if (mode === "editor" && currentUser) {
    return <MultiTextEditorApp currentUser={currentUser} onLogout={handleLogout} />;
  }

  return null;
}

export default UserAppManager;
