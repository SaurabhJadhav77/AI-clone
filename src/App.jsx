import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chatroom from "./pages/Chatroom";

const App = () => {
  const user = useSelector((state) => state.auth.user);
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="app">
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          padding: "8px 12px",
          borderRadius: "8px",
          background: darkMode ? "#90a4ae" : "#263238",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
      ></button>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chat/:id"
          element={user ? <Chatroom /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
     </div>
  );
};

export default App;
