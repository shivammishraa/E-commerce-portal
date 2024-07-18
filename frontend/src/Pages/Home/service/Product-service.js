import axios from "axios";
export const FetchProducts = () => {
  return axios.get(`http://localhost:4000/product`);
};
export const deleteProduct=(productId,header)=>{
  return axios.delete(`http://localhost:4000/product/${productId}`,{headers:header});
}