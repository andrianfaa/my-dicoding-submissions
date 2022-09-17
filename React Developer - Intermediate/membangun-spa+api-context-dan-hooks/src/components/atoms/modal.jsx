/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { Portal } from "@/components";

export function Modal({
  state, onClose, size = "max-w-xl", children,
}) {
  return (
    <Portal root="modal-root">
      {state ? (
        <section
          id="modal"
          className="fixed z-60 top-0 left-0 h-screen w-full overflow-y-auto p-4 bg-color-headline dark:bg-color-background-alt-dark bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className={`w-full ${size} bg-color-background dark:bg-color-background-dark p-4 md:p-6 rounded`}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </div>
        </section>
      ) : <div />}
    </Portal>
  );
}

Modal.propTypes = {
  state: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.string,
  children: PropTypes.node,
};
