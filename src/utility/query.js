import axios from "axios";
const baseUrl = "http://localhost:8000";

const get = (url) => {
  return axios.get(`${baseUrl}${url}`,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res =>  {     
      if(res.data.auth === false) {
        window.localStorage.clear();
      }
      return res.data 
    })
    .catch(err => console.log(err));
}

const put = (url,user) => {
  return axios.put(`${baseUrl}${url}`,user,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res => res.data )
    .catch(err => console.log(err));
}

const remove = (url) => {
  return axios.delete(`${baseUrl}${url}`,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res => res.data )
    .catch(err => console.log(err));
}

const create = (url,user) => {
  return axios.post(`${baseUrl}${url}`,user,{ headers:{"x-access-token": window.localStorage.getItem("token")}})
    .then(res => res.data )
    .catch(err => console.log(err));
}

export default { get, put, remove, create }