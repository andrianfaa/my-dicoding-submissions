import { useState } from "react";

export function useForm() {
  const [state, setState] = useState([]);

  function register(name = "", options = {}) {
    if (!state.find((item) => item.name === name)) {
      setState((prevState) => [
        ...prevState,
        {
          name,
          value: "",
        },
      ]);
    }

    const onChange = (event) => {
      const { value } = event.target;

      setState((prevState) => prevState.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            value,
          };
        }

        return item;
      }));
    };

    return {
      onChange: options.onChange || onChange,
      name,
      value: state.find((item) => item.name === name)?.value,
      ...options,
    };
  }

  function setFormState(key, value) {
    const find = !!state.find((item) => item.name === key);

    if (!find) throw new Error(`Key '${key}' not found`);

    setState((prevState) => prevState.map((item) => {
      if (item.name === key) {
        return {
          ...item,
          value,
        };
      }

      return item;
    }));
  }

  const formState = state.length > 0
    ? state.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {}) : {};

  return {
    formState,
    setFormState,
    register,
  };
}
