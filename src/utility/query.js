import axios from "axios";
const baseUrl = "http://localhost:8000";

const get = (url) => {
  return axios.get(`${baseUrl}${url}`,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res => res.data )
    .catch(err => console.log(err));
}

const put = (url,user) => {
  return axios.put(`${baseUrl}${url}`,user,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res =>{ console.log(res.data); 
      return res.data})
    .catch(err => console.log(err));
}

const remove = (url) => {
  return axios.delete(`${baseUrl}${url}`,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res =>{ console.log(res.data); 
      return res.data})
    .catch(err => console.log(err));
}

const create = (url,user) => {
  return axios.post(`${baseUrl}${url}`,user,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res =>{ console.log(res.data); 
      return res.data})
    .catch(err => console.log(err));
}

const logout = (url) => {
  return axios.get(`${baseUrl}${url}`)
  .then((res) => {
    if(res.data.auth === false) {
      window.localStorage.clear();
    }
    return res.data;
  })
}

const filter = (url) => {
  return axios.get(`${baseUrl}${url}`)
  .then((res) => {
    console.log(res.data);
    return res.data;
  })
}

export default {get,put,remove,create,logout,filter}