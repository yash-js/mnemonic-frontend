import axios from "axios";

const API = " http://localhost:5000";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const resp = await axios.get(`${API}/signout`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const resp = await axios.get(`${API}/user/getuser`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriends = async () => {
  try {
    const resp = await axios.get(`${API}/friend`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriendRequests = async () => {
  try {
    const resp = await axios.get(`${API}/friend/requests`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getSuggestions = async () => {
  try {
    const resp = await axios.get(`${API}/friend/suggestions`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const removeFriend = async (id) => {
  try {
    const resp = await axios.delete(`${API}/friend/remove/${id}`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const cancelRequest = async (id) => {
  try {
    const resp = await axios.delete(`${API}/friend/cancel/${id}`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const acceptFriendRequest = async (id) => {
  try {
    const resp = await axios.post(`${API}/friend/accept/${id}`, {}, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const searchUser = async (query) => {
  try {
    const resp = await axios.get(`${API}/user/search/${query}`, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const addFriend = async (id) => {
  try {
    const resp = await axios.post(`${API}/friend/add/${id}`, {}, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getSentRequests = async () => {
  try {
    const resp = await axios.get(`${API}/friend/sent`, config);
    return resp;
  } catch (error) {
    return error;
  }
};
