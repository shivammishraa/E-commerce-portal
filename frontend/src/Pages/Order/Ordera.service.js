import axois from "axios"
export const getOrder=(header)=>{
    return axois.get(`http://localhost:4000/order`,{headers:header})
}