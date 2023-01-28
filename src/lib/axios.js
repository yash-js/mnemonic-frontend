import axios from "axios";

export const mnemonic = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});
