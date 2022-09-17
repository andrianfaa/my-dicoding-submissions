/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { useState } from "react";

export function useDropdown() {
  const [defaultState, setDefaultState] = useState(false);

  const Dropdown = {
    Toggler: ({
      children, className, onClick, title,
    }) => (
      <button
        type="button"
        className={className}
        id="dropdown-toggler"
        title={title}
        onClick={onClick || (() => setDefaultState(!defaultState))}
      >
        {children}
      </button>
    ),

    Content: ({ children, className, state }) => {
      if (typeof state === "boolean") {
        if (!state) return <div />;

        return (
          <div id="dropdown-content" className={className}>
            {children}
          </div>
        );
      }

      if (!defaultState) return <div />;

      return (
        <div id="dropdown-content" className={className}>
          {children}
        </div>
      );
    },
  };

  Dropdown.Toggler.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
  };

  Dropdown.Content.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    state: PropTypes.bool,
  };

  return {
    Dropdown,
    dropdownState: defaultState,
    setDropdownState: setDefaultState,
  };
}
