import { createContext } from "react";

export const SettingContext = createContext({
  setting: {
    theme: "light",
    saveNotesLocally: false,
  },
  setSetting: () => {},
});

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
});
