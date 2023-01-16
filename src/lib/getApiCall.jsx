import axios from "axios";

const API = process.env.REACT_APP_API

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
    if (!data.profilePic) {
      data.profilePic = `https://ui-avatars.com/api/?name=${
        data.firstName + "+" + data.lastName
      }`;
    }
    const resp = await axios.post(`${process.env.REACT_APP_API}/signup`, data);
    return resp;
  } catch (error) {
    return error;
  }
};

export const signOut = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_API}/signout`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_API}/user/getuser`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriends = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_API}/friend`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriendRequests = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_API}/friend/requests`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getSuggestions = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_API}/friend/suggestions`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const removeFriend = async (id) => {
  try {
    const resp = await axios.delete(`${process.env.REACT_APP_API}/friend/remove/${id}`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const acceptFriendRequest = async (id) => {
  try {
    const resp = await axios.post(`${process.env.REACT_APP_API}/friend/accept/${id}`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const searchUser = async (query) => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_API}/user/search/${query}`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const addFriend = async (id) => {
  try {
    const resp = await axios.post(`${process.env.REACT_APP_API}/friend/add/${id}`);
    return resp;
  } catch (error) {
    return error;
  }
};
