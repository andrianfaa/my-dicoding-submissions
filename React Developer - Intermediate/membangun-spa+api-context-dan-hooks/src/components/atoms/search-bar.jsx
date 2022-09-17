/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = memo(({ inputProps, onSearch, value }) => {
  const handleOnEnter = useCallback((event) => {
    const { code, key } = event;

    if ((code || key).toLowerCase() === "enter") {
      onSearch(value);
    }
  }, [value]);

  return (
    <section className="relative flex items-center justify-start">
      <FiSearch className="absolute h-4 w-4 left-4" />
      <input
        className="input-base w-full md:max-w-72 pl-12"
        autoComplete="off"
        onKeyDown={handleOnEnter}
        {...inputProps}
      />
    </section>
  );
});

SearchBar.propTypes = {
  inputProps: PropTypes.object,
  onSearch: PropTypes.func,
  value: PropTypes.string,
};
