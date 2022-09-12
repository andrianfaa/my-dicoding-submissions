import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export function Portal({ containerId, children }) {
  const portalRoot = document.getElementById(containerId);

  if (portalRoot) {
    return createPortal(children, portalRoot);
  }

  return null;
}

Portal.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.element,
};
