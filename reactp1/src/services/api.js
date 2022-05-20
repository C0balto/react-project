import axios from "axios";

const api = axios.create({
  baseURL: "https://crudcrud.com/api/f7775050ebcd4204807a883667143f40",
  headers: {
    post: {  
      header1: 'value1'
    }
  }
});

export default api;