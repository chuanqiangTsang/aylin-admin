import axios from 'axios';


// 请求拦截器
axios.interceptors.request.use((config) => {
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
