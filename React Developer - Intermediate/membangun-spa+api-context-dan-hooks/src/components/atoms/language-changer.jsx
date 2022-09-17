import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import { useDropdown } from "@/hooks";

export const LanguageChanger = memo(({
  langList, currentLang, setLanguage,
}) => {
  const { Dropdown, setDropdownState } = useDropdown();

  const handleSetLang = useCallback((value) => {
    if (typeof value === "string") {
      setLanguage(value);
      setDropdownState(false);
    }
  }, []);

  return (
    <div id="change-language" className="relative">
      <Dropdown.Toggler
        className="button-base cursor-pointer"
        title={currentLang === "en" ? "Change Language" : "Ubah Bahasa"}
      >
        {langList.find((language) => language.lang === currentLang).name}
      </Dropdown.Toggler>

      <Dropdown.Content
        className="bg-color-background dark:bg-color-background-dark border border-color-border dark:border-color-border-dark flex flex-col absolute right-0 z-10 rounded top-14"
      >
        {langList.map((language) => (
          <button
            key={language.lang}
            title={currentLang === "en" ? `Set language to ${language.lang === "en" ? "English" : "Indonesia"}` : `Ubah bahasa ke ${language.lang === "en" ? "English" : "Indonesia"}`}
            type="button"
            className="not-last:border-b border-b-color-border dark:border-b-color-border-dark py-3 px-5 whitespace-nowrap hover:bg-color-button-base dark:hover:bg-color-button-base-dark focus:bg-color-button-base dark:focus:bg-color-button-base-dark"
            onClick={() => handleSetLang(language.lang)}
          >
            {language.name}
          </button>
        ))}
      </Dropdown.Content>
    </div>
  );
});

LanguageChanger.propTypes = {
  langList: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    lang: PropTypes.string,
  })).isRequired,
  currentLang: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};
