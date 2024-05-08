import axios from "../config/axios";
const getCustomer = async (Phone) => {
    const response = await axios.get(`/get/customer/${Phone}`);
    return response.data;
}
export  {
    getCustomer
}