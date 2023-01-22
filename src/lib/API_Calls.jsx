import { mnemonic } from "./axios";

export const signIn = async (data) => {
  try {
    const resp = await mnemonic.post(`/signin`, data);
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
    const resp = await mnemonic.post(`/signup`, data);
    return resp;
  } catch (error) {
    return error;
  }
};

export const signOut = async () => {
  try {
    const resp = await mnemonic.get(`/signout`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const resp = await mnemonic.get(`/user/getuser`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriends = async () => {
  try {
    const resp = await mnemonic.get(`/friend`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFriendRequests = async () => {
  try {
    const resp = await mnemonic.get(`/friend/requests`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getSuggestions = async () => {
  try {
    const resp = await mnemonic.get(`/friend/suggestions`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const removeFriend = async (id) => {
  try {
    const resp = await mnemonic.delete(`/friend/remove/${id}`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const cancelRequest = async (id) => {
  try {
    const resp = await mnemonic.delete(`/friend/cancel/${id}`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const acceptFriendRequest = async (id) => {
  try {
    const resp = await mnemonic.post(`/friend/accept/${id}`, {});
    return resp;
  } catch (error) {
    return error;
  }
};

export const searchUser = async (query) => {
  try {
    const resp = await mnemonic.get(`/user/search/${query}`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const addFriend = async (id) => {
  try {
    const resp = await mnemonic.post(`/friend/add/${id}`, {});
    return resp;
  } catch (error) {
    return error;
  }
};

export const getSentRequests = async () => {
  try {
    const resp = await mnemonic.get(`/friend/sent`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (data) => {
  try {
    const resp = await mnemonic.put(`/user/edit`, data);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getNotications = async () => {
  try {
    const resp = await mnemonic.get(`/user/notifications`);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getAllFriedsData = async () => {
  try {
    const resp = await mnemonic.get(`/friend/all`);
    return resp;
  } catch (error) {
    return error;
  }
};
