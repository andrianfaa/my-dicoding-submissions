/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types";
import { BiLoaderAlt } from "react-icons/bi";
import { Modal } from "@/components/atoms";

const defaultButtons = [
  {
    text: "Delete",
    className: "button-danger w-full sm:w-24",
    type: "delete",
  },
  {
    text: "Cancel",
    className: "w-full sm:w-auto",
  },
];

export function ModalDelete({
  state, onClose, onClickDelete, buttons = defaultButtons, title, subtitle, size, loadingDelete,
}) {
  return (
    <Modal
      state={state}
      onClose={onClose}
      size={size}
    >
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">{title || "Modal Title"}</h2>
        <p className="mb-4">{subtitle || "Modal Subtitle"}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          {buttons.map(({ text, className, type = "cancel" }) => (
            <button
              key={text}
              type="button"
              className={`button-base ${className}`}
              onClick={type === "delete" ? onClickDelete : onClose}
              disabled={loadingDelete}
            >
              {type === "delete"
                ? ((loadingDelete) ? (
                  <BiLoaderAlt className="text-base animate-spin" />
                ) : text)
                : text}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

ModalDelete.propTypes = {
  state: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.exact({
    text: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
  })),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  size: PropTypes.string,
  loadingDelete: PropTypes.bool,
};
