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

export const getUser = async () => {
  try {
    const resp = await axios.get("/getuser");
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriends = async () => {
  try {
    const resp = await axios.get("/friend");
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriendRequests = async () => {
  try {
    const resp = await axios.get("/friend/requests");
    return resp;
  } catch (error) {
    return error;
  }
};

export const getSuggestions = async () => {
  try {
    const resp = await axios.get("/friend/suggestions");
    return resp;
  } catch (error) {
    return error;
  }
};

export const removeFriend = async (id) => {
  try {
    const resp = await axios.delete("/friend/remove", {
      data: {
        id,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
};
