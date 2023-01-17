import axios from "axios";

const API = process.env.REACT_APP_API;

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Access-Control-Allow-Origin": "*",
  },
};

export const signIn = async (data) => {
  try {
    const resp = await axios.post(`${API}/signin`, data);
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
    const resp = await axios.post(`${API}/signup`, data);
    return resp;
  } catch (error) {
    return error;
  }
};

export const signOut = async () => {
  try {
    const resp = await axios.get(`${API}/signout`, headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const resp = await axios.get(`${API}/user/getuser`, headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriends = async () => {
  try {
    const resp = await axios.get(`${API}/friend`, headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriendRequests = async () => {
  try {
    const resp = await axios.get(`${API}/friend/requests`, headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getSuggestions = async () => {
  try {
    const resp = await axios.get(`${API}/friend/suggestions`, headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const removeFriend = async (id) => {
  try {
    const resp = await axios.delete(`${API}/friend/remove/${id}`,headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const acceptFriendRequest = async (id) => {
  try {
    const resp = await axios.post(`${API}/friend/accept/${id}`, {}, headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const searchUser = async (query) => {
  try {
    const resp = await axios.get(`${API}/user/search/${query}`, headers);
    return resp;
  } catch (error) {
    return error;
  }
};

export const addFriend = async (id) => {
  try {
    const resp = await axios.post(`${API}/friend/add/${id}`, {}, headers);
    return resp;
  } catch (error) {
    return error;
  }
};
