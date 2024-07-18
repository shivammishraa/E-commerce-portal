import axios from "axios";
export const getCart = (header) => {
  return axios.get(`http://localhost:4000/cart`, { headers: header });
};
export const PlaceOrder = (header) => {
  return axios.post(`http://localhost:4000/order`, null, { headers: header });
};
