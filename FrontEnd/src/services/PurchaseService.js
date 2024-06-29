import axios from "../config/axios";

const getAllPurchaseOrder = async (page, limit) => {
    const response = await axios.get(`/get/purchase/?page=${page}&limit=${limit}`);
    return response.data;
}
export  {
    getAllPurchaseOrder
}