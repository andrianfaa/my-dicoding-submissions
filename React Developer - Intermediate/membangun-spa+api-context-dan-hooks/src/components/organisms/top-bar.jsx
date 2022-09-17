import {
  memo, useCallback, useContext, useMemo,
} from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, LanguageContext, ThemeContext } from "@/app/contexts";
import { localize } from "@/app/localize";
import { LanguageChanger, UserIndicator } from "@/components/atoms";
import { LocalStorage } from "@/utils";

export const TopBar = memo(() => {
  const { auth, setAuth } = useContext(AuthContext);
  const { lang, setLang } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { appName } = lang === "en" ? localize.en : localize.id;

  const handleSetTheme = useCallback(() => {
    setTheme((prevTheme) => ((prevTheme === "dark") ? "light" : "dark"));
  }, []);

  const handleLogout = useCallback(() => {
    navigate("/");
    LocalStorage.remove("user");
    LocalStorage.remove("token");
    setAuth((prevState) => ({
      ...prevState,
      user: null,
      token: null,
    }));
  }, []);

  const langList = useMemo(() => [
    {
      name: "🇮🇩 ID",
      lang: "id",
    },
    {
      name: "🇺🇸 EN",
      lang: "en",
    },
  ], []);

  return (
    <section id="top-bar" className="w-full fixed z-40 top-0 left-0 bg-color-background dark:bg-color-background-dark">
      <div className="container py-0 md:py-0 h-20 flex flex-row items-center justify-between">
        <Link
          to="/"
          className="text-lg no-underline text-color-headline dark:text-color-headline-dark font-semibold tracking-tighter"
        >
          {appName}
        </Link>

        <section id="top-bar-menus" className="flex flex-row items-center justify-end gap-2">
          <LanguageChanger
            currentLang={lang}
            langList={langList}
            setLanguage={setLang}
          />

          <button
            className="button-base !p-0 h-50px w-50px flex items-center justify-center"
            type="button"
            title={lang === "en" ? "Change Theme" : "Ubah Tema"}
            onClick={handleSetTheme}
          >
            {theme === "dark" ? (
              <FiMoon className="w-4 h-4" />
            ) : (
              <FiSun className="w-4 h-4" />
            )}
          </button>

          {auth.user && (
            <UserIndicator
              user={auth.user}
              lang={lang}
              onClickLogout={handleLogout}
            />
          )}
        </section>
      </div>
    </section>
  );
});
