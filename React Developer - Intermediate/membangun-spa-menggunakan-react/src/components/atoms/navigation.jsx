/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = memo(({
  navLink,
  showNavigationButton = true,
}) => {
  const [show, setShow] = useState(false);

  return (
    <section id="navigation" className={`fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-40 ${showNavigationButton ? "" : "h-[60px] w-[60px]"}`}>
      {showNavigationButton && (
        <button
          className={`navigation-button ${show ? "open" : ""}`}
          type="button"
          title="Navigation button"
          onClick={() => setShow(!show)}
        >
          <span id="icon" />
          <span id="icon" />
        </button>
      )}

      <nav id="navigation-links" className={showNavigationButton ? `navigation-links ${show ? "open" : ""}` : "navigation-links-opened"}>
        {navLink && navLink.map(({
          name, path, icon, onClick,
        }) => {
          if (onClick) {
            return (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClick();
                }}
                type="button"
                key={name}
                title={name}
              >
                {icon || name}
              </button>
            );
          }

          return (
            <Link
              key={name}
              to={path}
              title={name}
            >
              {icon || name}
            </Link>
          );
        })}
      </nav>
    </section>
  );
});

Navigation.propTypes = {
  navLink: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.node,
  })),
  showNavigationButton: PropTypes.bool,
};
