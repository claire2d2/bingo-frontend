import axios from "axios";

const bingoApi = axios.create({
  //   baseURL: import.meta.env.VITE_BACKEND_URL
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

bingoApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return request;
  }
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default bingoApi;
