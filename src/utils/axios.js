import axios from 'axios';

import { JWT_HOST_API } from 'configs/auth.config';


const axiosInstance = axios.create({
  baseURL: JWT_HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
