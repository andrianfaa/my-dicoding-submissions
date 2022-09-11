/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { DEFAULT_NOTES, DEFAULT_SETTING } from "@/app/constants";
import { SettingContext, NotesContext } from "@/app/contexts";
import { Router } from "@/components";
import { LocalStorage } from "@/utils";

function App() {
  const [setting, setSetting] = useState(LocalStorage.get("setting") || DEFAULT_SETTING);
  const [notes, setNotes] = useState(LocalStorage.get("notes") || [...DEFAULT_NOTES]);

  useEffect(() => {
    LocalStorage.set("setting", setting);
  }, [setting]);

  useEffect(() => {
    if (setting.saveNotesLocally) {
      LocalStorage.set("notes", notes);
    } else {
      LocalStorage.delete("notes");
    }
  }, [notes, setting]);

  return (
    <SettingContext.Provider value={{ setting, setSetting }}>
      <NotesContext.Provider value={{ notes, setNotes }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </NotesContext.Provider>
    </SettingContext.Provider>
  );
}

export default App;
