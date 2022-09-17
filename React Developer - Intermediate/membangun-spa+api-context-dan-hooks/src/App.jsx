/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { LANGUAGES } from "@/app/constants";
import { LanguageContext, NotesContext, ThemeContext } from "@/app/contexts";
import { AuthTypes } from "@/app/types";
import { Router, withAuth } from "@/components";
import { LocalStorage } from "@/utils";

function App({ auth }) {
  const [lang, setLang] = useState(LANGUAGES.includes(LocalStorage.get("lang")) ? LocalStorage.get("lang") : "en");
  const [theme, setTheme] = useState(LocalStorage.get("theme") || "light");
  const [notes, setNotes] = useState([]);

  function applyTheme() {
    const html = document.querySelector("html") || document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }

  useEffect(() => {
    LocalStorage.set("lang", lang);
  }, [lang]);

  useEffect(() => {
    LocalStorage.set("theme", theme);

    applyTheme();
  }, [theme]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NotesContext.Provider value={{ notes, setNotes }}>
          <BrowserRouter>
            <Router token={auth.token} lang={lang} />
          </BrowserRouter>
        </NotesContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

App.propTypes = {
  auth: AuthTypes,
};

export default withAuth(App);
