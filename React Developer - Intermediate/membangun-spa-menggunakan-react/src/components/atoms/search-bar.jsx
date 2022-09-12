/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";
import { useCallback, memo } from "react";

export const SearchBar = memo(({
  value, onSearch, onChange, datalist,
}) => {
  const handleOnSearch = useCallback((event) => {
    const { key } = event;

    if (key.toLowerCase() === "enter") {
      onSearch(value);
    }
  }, [value]);

  const handleOnBlur = useCallback(() => {
    onSearch(value);
  }, [value]);

  return (
    <section id="search-bar" className="relative w-full flex items-center">
      <input
        type="search"
        name="search-note"
        id="search-note"
        className="input-base pl-10"
        placeholder="Search note..."
        title="Search note..."
        list="searchbar-list"
        value={value}
        autoComplete="off"
        onKeyDown={handleOnSearch}
        onChange={onChange}
        onBlur={handleOnBlur}
      />

      <datalist id="searchbar-list">
        {datalist.slice(0, 5).map((title) => (
          <option key={title} value={title}>{title}</option>
        ))}
      </datalist>

      <label htmlFor="search-note" className="absolute left-4" title="Search note...">
        <FiSearch className="" title="Search note..." />
      </label>
    </section>
  );
});

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  datalist: PropTypes.arrayOf(PropTypes.string).isRequired,
};
