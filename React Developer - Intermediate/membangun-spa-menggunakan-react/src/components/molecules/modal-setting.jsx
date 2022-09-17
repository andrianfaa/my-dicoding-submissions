/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Modal, Switch } from "@/components/atoms";
import { SettingContext } from "@/app/contexts";
import { useDropdown, useTheme } from "@/hooks";

export function ModalSetting({ open, onClose }) {
  const { setting, setSetting } = useContext(SettingContext);
  const { Dropdown, setDropdownState } = useDropdown();
  const { changeTheme } = useTheme();

  const { theme, saveNotesLocally } = setting;

  const themeList = [
    {
      title: "Light",
      icon: FiSun,
    },
    {
      title: "Dark",
      icon: FiMoon,
    },
  ];

  const selectedTheme = themeList.find(({ title }) => title.toLowerCase() === theme);

  const handleSetTheme = (value) => {
    changeTheme(value);
    setDropdownState(false);
  };

  const settings = [
    {
      name: "Theme",
      render: () => selectedTheme && (
        <div className="relative">
          <Dropdown.Toggler>
            <button type="button" className="button-base flex flex-row items-center gap-2">
              <selectedTheme.icon />
              {" "}
              {selectedTheme.title}
            </button>
          </Dropdown.Toggler>

          <Dropdown.Content className="flex flex-col border-default border-color-border dark:border-color-border-dark rounded absolute z-10 bg-color-background dark:bg-color-background-dark translate-y-2">
            <ul>
              {themeList.map(({ title, icon: Icon }) => (
                <li
                  type="button"
                  key={title}
                  className={`p-3.5 first:border-b-[1.5px] first:border-b-color-border dark:first:border-b-color-border-dark flex flex-row items-center gap-2 hover:cursor-pointer hover:bg-color-background-alt dark:hover:bg-color-background-alt-dark select-none ${selectedTheme.title.toLowerCase() === title.toLowerCase() ? "bg-color-background-alt dark:bg-color-background-alt-dark opacity-50 hover:cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (selectedTheme.title.toLowerCase() === title.toLowerCase()) return;
                    handleSetTheme(title.toLowerCase());
                  }}
                >
                  <Icon />
                  {" "}
                  {title}
                </li>
              ))}
            </ul>
          </Dropdown.Content>
        </div>
      ),
    },
    {
      name: "Save Notes Locally",
      render: () => (
        <Switch
          value={saveNotesLocally}
          onClick={() => setSetting({
            ...setting,
            saveNotesLocally: !setting.saveNotesLocally,
          })}
        />
      ),
    },
  ];

  return (
    <Modal
      open={open}
      title="Settings"
      onClose={onClose}
    >
      <>
        {settings.map(({ name, render }) => (
          <div className="mb-4 w-full flex flex-row items-center" key={name}>
            <p className="flex-1">
              {name}
            </p>

            {render()}
          </div>
        ))}
      </>
    </Modal>
  );
}

ModalSetting.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
