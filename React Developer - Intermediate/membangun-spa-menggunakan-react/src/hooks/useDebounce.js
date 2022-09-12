import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

useDebounce.propTypes = {
  value: PropTypes.string.isRequired,
  delay: PropTypes.number,
};
