/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationLinkTypes } from "@/app/types";

export function Navigation({ showNavigationButton = true, navigationLink }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed z-50 <sm:bottom-4 <sm:right-4 sm:bottom-4 sm:pr-4 md:pr-6">
      {showNavigationButton && (
        <button
          type="button"
          className={`button-base !p-0 navigation-button ${showMenu ? "open" : ""}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <span id="icon" />
          <span id="icon" />
        </button>
      )}

      {navigationLink && navigationLink.length > 0 && (
        <div className={`absolute flex flex-col items-center justify-center ${showNavigationButton ? (showMenu ? "bottom-18" : "hidden") : "bottom-0 w-16 right-0 sm:right-4 md:right-6"}`}>
          {navigationLink.map(({
            name, path, onClick, icon, disabled,
          }) => {
            if (onClick) {
              return (
                <button
                  key={name}
                  disabled={disabled || false}
                  onClick={onClick}
                  type="button"
                  className="button-base !p-0 navigation-button not-last:mb-2 text-bg-color-text dark:text-color-text-dark"
                  title={name}
                >
                  {icon}
                </button>
              );
            }

            return (
              <Link
                to={path}
                key={name}
                className="button-base !p-0 navigation-button not-last:mb-2 text-bg-color-text dark:text-color-text-dark"
                title={name}
              >
                {icon}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

Navigation.propTypes = {
  showNavigationButton: PropTypes.bool,
  navigationLink: NavigationLinkTypes,
};
