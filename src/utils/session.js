import axios from 'axios';

export const getUserInfo = (token) => {
  const userInfo = [];

  axios.get(import.meta.env.VITE_BASE_URL + 'user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    userInfo.push(res.data);
  });

  return userInfo;ß
}

export const logout = () => {
  return axios.get(import.meta.env.VITE_BASE_URL + 'logout');
}