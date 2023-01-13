import axios from "axios";

export const signIn = async (data) => {
  try {
    const resp = await axios.post("/signin", data);
    return resp;
  } catch (error) {
    return error;
  }
};

export const signUp = async (data) => {
  try {
    const resp = await axios.post("/signup", data);
    return resp;
  } catch (error) {
    return error;
  }
}
