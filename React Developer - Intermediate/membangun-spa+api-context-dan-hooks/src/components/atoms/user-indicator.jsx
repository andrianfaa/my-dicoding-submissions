import PropTypes from "prop-types";
import { FiUser } from "react-icons/fi";
import { memo } from "react";
import { useDropdown } from "@/hooks";
import { localize } from "@/app/localize";

export const UserIndicator = memo(({ user, lang, onClickLogout }) => {
  const { Dropdown } = useDropdown();

  const page = localize[lang];

  return (
    <div className="relative">
      <Dropdown.Toggler className="button-base <sm:w-50px <sm:h-50px <sm:p-0 whitespace-nowrap flex items-center justify-center gap-2" type="button">
        <FiUser className="w-4 h-4" />
        {" "}
        <span className="hidden sm:inline">
          {user?.name.split(" ")[0]}
        </span>
      </Dropdown.Toggler>

      <Dropdown.Content className="bg-color-background dark:bg-color-background-dark border border-color-border dark:border-color-border-dark flex flex-col absolute right-0 z-10 rounded top-14 >sm:w-full p-4">
        <div className="flex flex-row items-center justify-between gap-4 mb-4">
          <div className="min-w-14 h-14 rounded-full bg-color-background-alt dark:bg-color-background-alt-dark flex items-center justify-center mx-auto">
            <FiUser className="w-6 h-6" />
          </div>
          <span className="block text-lg font-semibold text-color-headline dark:text-color-headline-dark tracking-tighter">{user?.name}</span>
        </div>

        <button type="button" className="button-base button-alert" onClick={onClickLogout}>
          {page.logoutText}
        </button>
      </Dropdown.Content>
    </div>
  );
});

UserIndicator.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  lang: PropTypes.string.isRequired,
  onClickLogout: PropTypes.func.isRequired,
};
