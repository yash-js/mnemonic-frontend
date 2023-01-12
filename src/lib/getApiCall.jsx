import React from "react";
import axios from "axios";

export const signIn = async (data) => {
  try {
    const resp = await axios.post("/signin", data);
    return resp;
  } catch (error) {
    return error;
  }
};
