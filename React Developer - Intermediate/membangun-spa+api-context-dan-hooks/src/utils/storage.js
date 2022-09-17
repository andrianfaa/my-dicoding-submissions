const LocalStorage = {
  get: (key) => {
    const data = localStorage.getItem(key);

    if (data) return JSON.parse(data);

    return null;
  },

  set: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data || "null"));
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

const SessionStorage = {
  get: (key) => {
    const data = sessionStorage.getItem(key);

    if (data) return JSON.parse(data);

    return null;
  },

  set: (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  },

  remove: (key) => {
    sessionStorage.removeItem(key);
  },

  clear: () => {
    sessionStorage.clear();
  },
};

export {
  LocalStorage,
  SessionStorage,
};
