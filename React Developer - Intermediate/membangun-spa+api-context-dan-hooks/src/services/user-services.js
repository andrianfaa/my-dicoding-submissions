/* eslint-disable consistent-return */
import { baseQuery, sendResponse } from "./base-services";

export const userRegister = async (value) => {
  try {
    const register = await baseQuery.post("/register", value);

    if (register.status === 201 && register.data.status === "success") {
      return sendResponse(false, register.data);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const userLogin = async (value) => {
  try {
    const login = await baseQuery.post("/login", value);

    if (login.status === 200 && login.data.status === "success") {
      return sendResponse(false, login.data);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await baseQuery.get("/users/me", {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });
    const { status, data } = response;

    if (status === 200) {
      return sendResponse(false, data);
    }
  } catch (error) {
    if ("response" in error) {
      return sendResponse(true, error.response);
    }
  }
};
