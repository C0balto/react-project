import axios from "axios";

const api = axios.create({
  baseURL: "https://crudcrud.com/api/a01fc2b816d5414d94212dd0e2a79c13",
});

export default api;