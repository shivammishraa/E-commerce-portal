import axios from "axios";
export const Login = (data) => {
  return axios.post("http://localhost:4000/login", data);
};
