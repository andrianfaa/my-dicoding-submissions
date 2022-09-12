/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import { memo } from "react";
import { v4 as uuidv4 } from "uuid";

export const Switch = memo(({ value, onClick, className }) => {
  const switchId = uuidv4();

  return (
    <label id={`switch-${switchId}`} className={`switch ${className} ${value && "toggled"}`}>
      <input
        type="checkbox"
        defaultChecked={value}
        className="hidden"
        onChange={onClick}
      />
      <button
        type="button"
        title="Toggle switch"
        onClick={onClick}
        className="switch-toggler cursor-pointer focus:outline focus:outline-1"
      />
    </label>
  );
});

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
