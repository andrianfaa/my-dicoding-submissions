/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { useState } from "react";

export function useDropdown() {
  const [dropdownState, setDropdownState] = useState(false);

  const Dropdown = {
    Toggler: ({ children, className }) => (
      <div id="dropdown-wrapper" className={className} onClick={() => setDropdownState(!dropdownState)}>
        {children}
      </div>
    ),

    Content: ({ children, className }) => {
      if (!dropdownState) return <div />;

      return (
        <div id="dropdown-content" className={className}>
          {children}
        </div>
      );
    },
  };

  Dropdown.Toggler.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
  };

  Dropdown.Content.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
  };

  return {
    Dropdown,
    dropdownState,
    setDropdownState,
  };
}
