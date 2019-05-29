import axios from '@/config/axios';

// 测试一下
export default {
  getTest(){
    return axios.get('http://192.168.7.248:3002/test');
  }
}