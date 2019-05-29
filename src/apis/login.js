import axios from '@/config/axios';

// 测试一下
export default {
  getTest(){
    return axios.get('/system/login');
  },

  testjwt(){
    return axios.get('/system/testjwt')
  }
}