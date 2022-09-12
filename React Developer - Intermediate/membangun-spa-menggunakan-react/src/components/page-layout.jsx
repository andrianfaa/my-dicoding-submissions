import PropTypes from "prop-types";
import { useContext } from "react";
import { NotesContext } from "@/app";
import { Navigation } from "./atoms";
import { TopBar } from "./organisms";

export function PageLayout({
  children,
  keyword,
  onSearch,
  onChange,
  notes: noteProps,
  navLink,
  showNavigation = true,
  showNavigationButton,
}) {
  const { notes } = useContext(NotesContext);

  return (
    <>
      <TopBar
        keyword={keyword}
        onSearch={onSearch}
        onChange={onChange}
        notes={noteProps || notes.filter(({ archived }) => !archived).map(({ title }) => title)}
      />

      <div className="container relative">
        {showNavigation && (
          <Navigation
            navLink={navLink}
            showNavigationButton={showNavigationButton}
          />
        )}

        {children}
      </div>
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  keyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.string),
  showNavigation: PropTypes.bool,
  showNavigationButton: PropTypes.bool,
  navLink: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.node,
  })),
};
