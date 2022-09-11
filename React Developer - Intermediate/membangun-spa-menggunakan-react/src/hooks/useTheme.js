import { useState, useEffect, useContext } from "react";
import { LocalStorage } from "@/utils";
import { SettingContext } from "@/app/contexts";

export function useTheme() {
  const [theme, setTheme] = useState("light");
  const { setSetting, setting } = useContext(SettingContext);

  const changeTheme = (value) => {
    if (value && typeof value === "string" && value !== theme) {
      setTheme(value);
      document.documentElement.setAttribute("data-theme", value);
    }
  };

  const loadTheme = () => {
    const localTheme = LocalStorage.get("theme");

    if (localTheme) {
      changeTheme(localTheme);
    } else {
      changeTheme(theme);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    LocalStorage.set("theme", theme);
    setSetting({
      ...setting,
      theme,
    });
  }, [theme]);

  return {
    theme,
    loadTheme,
    changeTheme,
  };
}
