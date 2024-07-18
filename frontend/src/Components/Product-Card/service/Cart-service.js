import axois from "axios";
export const UpdateCart = (data, header) => {
  return axois.patch(`http://localhost:4000/cart`, data, { headers: header });
};
