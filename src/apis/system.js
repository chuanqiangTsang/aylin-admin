import axios from '@/config/axios';

// 测试一下
export default {
  login(params){
    return axios.post('/system/login', params);
  },

  logout(){
    return axios.get('/system/logout');
  },

  testjwt(){
    return axios.get('/system/testjwt')
  }
}