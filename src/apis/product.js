import axios from '@/config/axios';

const path = '/product';

export default {
  addCategory(params){
    return axios.post(`${path}/addCategory`, params);
  },

  getCategory(params){
    return axios.get(`${path}/getCategory`, {
      params
    })
  },

  updateStatus(params){
    return axios.put(`${path}/updateStatus`, params)
  },

  update(params){
    return axios.put(`${path}/update`, params);
  },

  delete(id){
    return axios.delete(`${path}/delete`, {params: {id}})
  },

  addSubCate(params){
    return axios.post(`${path}/addSubCate`, params);
  }
}