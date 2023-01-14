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
};

export const signOut = async () => {
  try {
    const resp = await axios.get("/signout");
    return resp;
  } catch (error) {
    return error;
  }
};


export const getUser = async (token) => {
  try {
    const resp = await axios.get("/getuser");
    return resp;
  } catch (error) {
    return error;
  }
};
