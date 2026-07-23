import { createContext, useContext, useEffect, useState } from "react";

const AdminThemeContext = createContext();

export function AdminThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const savedTheme = localStorage.getItem("admin-theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", darkMode);
    localStorage.setItem("admin-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <AdminThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
