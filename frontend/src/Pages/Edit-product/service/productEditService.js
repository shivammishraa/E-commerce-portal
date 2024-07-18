import axois from "axios";
export const GetProductById = (id, header) => {
  return axois.get(`http://localhost:4000/product/${id}`, { headers: header });
};
export const UpdateProduct=(id,data,header)=>{
    return axois.patch(`http://localhost:4000/product/${id}`, data,{ headers: header });
}