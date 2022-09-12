/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { memo } from "react";
import { FiX } from "react-icons/fi";
import { Portal } from "../portal";

export const Modal = memo(({
  open, title, children, onClose,
}) => {
  if (!open) return <div />;

  return (
    <Portal containerId="modal-root">
      <div
        id={`modal-${Math.floor(Math.random() * 10000)}`}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-25 p-4 flex items-center justify-center"
        onClick={onClose}
      >
        <div className="flex flex-col rounded bg-color-background dark:bg-color-background-dark w-full max-w-lg" onClick={(event) => event.stopPropagation()}>
          <section
            id="modal-header"
            className="border-b border-b-color-border dark:border-b-color-border-dark px-4 py-4 flex flex-row items-start justify-between"
          >
            <h2 className="modal-title font-semibold text-lg">{title || "Modal Title"}</h2>

            <button type="button" onClick={onClose} className="">
              <FiX className="text-base inline align-middle" />
            </button>
          </section>

          <section id="modal-body" className="p-4">
            {children}
          </section>
        </div>
      </div>
    </Portal>
  );
});

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
