export const sessionStorage = {
  get: (key) => {
    const value = sessionStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  },

  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  delete: (key) => {
    const value = sessionStorage.getItem(key);

    if (value) {
      sessionStorage.removeItem(key);
    }
  },

  clearAll: () => {
    sessionStorage.clear();
  },
};

export const LocalStorage = {
  get: (key) => {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  },

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  delete: (key) => {
    const value = localStorage.getItem(key);

    if (value) {
      localStorage.removeItem(key);
    }
  },

  clearAll: () => {
    localStorage.clear();
  },
};
