import axios from "axios";

export const mnemonic = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
