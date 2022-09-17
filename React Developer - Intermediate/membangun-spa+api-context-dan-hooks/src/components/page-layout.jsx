import PropTypes from "prop-types";
import { NavigationLinkTypes } from "@/app/types";
import { Navigation } from "@/components/atoms";
import { TopBar } from "@/components/organisms";

export function PageLayout({
  children, showNavigationButton, showNavigation = false, navigationLink, wrapperClassName = "container",
}) {
  return (
    <>
      <TopBar />
      <div className="relative container !p-0 flex justify-end">
        {showNavigation && (
          <Navigation
            showNavigationButton={showNavigationButton}
            navigationLink={navigationLink}
          />
        )}

        <div className={`w-full ${wrapperClassName}`}>
          {children}
        </div>
      </div>
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  showNavigation: PropTypes.bool,
  showNavigationButton: PropTypes.bool,
  navigationLink: NavigationLinkTypes,
  wrapperClassName: PropTypes.string,
};
