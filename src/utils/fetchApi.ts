import axios from 'axios';

export const axiosFetch = axios.create({
  baseURL: process.env.API_HOST,
});

axiosFetch.interceptors.request.use((config) => {
  try {
    config.headers.Authorization = process.env.TOKEN;
  } catch (e) {
    console.log(e);
  }
  return config;
});
