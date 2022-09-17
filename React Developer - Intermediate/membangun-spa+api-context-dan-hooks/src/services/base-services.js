import axios from "axios";

export const baseQuery = axios.create({
  baseURL: "https://notes-api.dicoding.dev/v1",
  timeout: 5000,
});

export function sendResponse(isError, data) {
  return {
    error: isError || false,
    status: data.status || null,
    message: data.data.message || data.message || null,
    data: data.data || null,
  };
}
