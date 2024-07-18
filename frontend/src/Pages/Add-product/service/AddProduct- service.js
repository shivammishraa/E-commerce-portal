import axois from "axios";
export const AddProduct = (data, header) => {
  return axois.post(`http://localhost:4000/product`, data, { headers: header });
};
