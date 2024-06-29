import axios from "../config/axios";

const getStoreById = async (branchId) => {
    const response = await axios.get(`/store/show/`);
    return response.data;
}
const fetchMedicineBranch = async () => {
    const response = await axios.get('/store/show/medicine/');
    return response.data;
}

const createOrder = async (orderItems , total,phoneCustomer, point, totalDiscount) => {
    const response = await axios.post(`/create/order/`,{ 
        orderItems, total, phoneCustomer, point, totalDiscount
    });
    return response.data;
}

const fetchDataAllPrescriptionWithBranch = async (phone, page, limit) => {
    const response = await axios.get(`/show/prescription/branch/?phone=${phone}&page=${page}&limit=${limit}`);
    return response.data;
}

const fetchDataPrescripTionDetail = async(PrescriptionId) => {
    const response = await axios.get(`/show/detail-prescription/${PrescriptionId}`);
    return response.data;

}

const createCustomer = async (dataCustomer) => {
    const response = await axios.post('/create/customer/', {
        dataCustomer
    });
    return response.data;

}




export {
    getStoreById,
    fetchMedicineBranch,
    createOrder,
    fetchDataAllPrescriptionWithBranch,
    fetchDataPrescripTionDetail,
    createCustomer,
}