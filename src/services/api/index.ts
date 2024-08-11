import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

if (!baseURL) throw new Error('API URL not found');

const baseApi = axios.create({
  baseURL,
  params: {
    appid: apiKey,
  },
});

export default baseApi;
