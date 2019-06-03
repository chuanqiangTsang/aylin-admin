import axios from 'axios';

axios.defaults.withCredentials = true; // 请求默认带上cookir

const host = process.env.VUE_APP_HOST;

// 请求拦截器
axios.interceptors.request.use((config) => {
  config.url = `${host}${config.url}`;

  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));


// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response.data;
  } 
  ,
  (error) => {
    if (error.response) {
      // error.response.status  200 401
    }
    return Promise.reject(error);
  }
);
export default axios;
