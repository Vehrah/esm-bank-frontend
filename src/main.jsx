import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AdminThemeProvider } from "./context/AdminThemeContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminThemeProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <App />
        </AuthProvider>
      </ThemeProvider>
    </AdminThemeProvider>
  </React.StrictMode>
);