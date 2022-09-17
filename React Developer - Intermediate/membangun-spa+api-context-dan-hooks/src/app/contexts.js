import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

export const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
});

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
});

export const AuthContext = createContext({
  auth: {
    user: null,
    token: "",
  },
  setAuth: () => {},
});
