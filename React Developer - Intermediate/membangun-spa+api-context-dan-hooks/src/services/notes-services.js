/* eslint-disable consistent-return */
import { baseQuery, sendResponse } from "./base-services";

export const getActiveNotes = async ({ token }) => {
  try {
    const notes = await baseQuery.get("/notes", {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });

    if (notes.status === 200 && notes.data.status === "success") {
      return sendResponse(false, notes);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const getArchiveNotes = async ({ token }) => {
  try {
    const notes = await baseQuery.get("/notes/archived", {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });

    if (notes.status === 200 && notes.data.status === "success") {
      return sendResponse(false, notes);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const getSingleNote = async (id, { token }) => {
  try {
    const notes = await baseQuery.get(`/notes/${id}`, {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });

    if (notes.status === 200 && notes.data.status === "success") {
      return sendResponse(false, notes);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const archiveNote = async (id, { token }) => {
  try {
    const notes = await baseQuery.post(`/notes/${id}/archive`, null, {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });

    if (notes.status === 200 && notes.data.status === "success") {
      return sendResponse(false, notes);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const unarchiveNote = async (id, { token }) => {
  try {
    const notes = await baseQuery.post(`/notes/${id}/unarchive`, null, {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });

    if (notes.status === 200 && notes.data.status === "success") {
      return sendResponse(false, notes);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const createNote = async (data, { token }) => {
  try {
    const notes = await baseQuery.post("/notes", data, {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });

    if (notes.status === 201 && notes.data.status === "success") {
      return sendResponse(false, notes);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const deleteNote = async (id, { token }) => {
  try {
    const notes = await baseQuery.delete(`/notes/${id}`, {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });

    if (notes.status === 200 && notes.data.status === "success") {
      return sendResponse(false, notes);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};
