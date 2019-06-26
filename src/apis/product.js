import axios from '@/config/axios';

export default {
  addCategory(params){
    return axios.post('/product/addCategory', params);
  }
}