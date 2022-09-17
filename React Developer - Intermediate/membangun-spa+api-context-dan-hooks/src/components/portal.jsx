import PropTypes from "prop-types";
import { createPortal } from "react-dom";

export function Portal({ root, children }) {
  const rootContainer = document.getElementById(root);

  if (rootContainer) {
    return createPortal(children, rootContainer);
  }

  return <div />;
}

Portal.propTypes = {
  root: PropTypes.string.isRequired,
  children: PropTypes.node,
};
