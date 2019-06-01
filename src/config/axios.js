import axios from 'axios';

axios.defaults.withCredentials = true; // 

const host = process.env.NODE_ENV === "debug" ?  'http://127.0.0.1:9000' : 'todo';

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
