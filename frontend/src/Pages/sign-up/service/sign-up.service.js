import axios from "axios";
export const SignUp = (data) => {
  return axios.post("http://localhost:4000/sign-up", data);
};
