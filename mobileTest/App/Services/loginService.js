import axios from 'axios';
// import axios from "../config/axios"

const baseURL = 'http://192.168.1.4:8080/api/v1';

const handleLoginApp = async (phoneNumber) => {
    let response = await axios.post(`${baseURL}/login/app`, {
        phoneNumber
    },)
    return response.data;
}

const getCategory = async () => {
    let response = await axios.get(`${baseURL}/get/category`);
    return response.data;
}

const getMedicine = async () => {
    let response = await axios.get(`${baseURL}/get/medicine`);
    return response.data;
}

const getMedicineWithId = async (MedicineId) => {
    let response = await axios.get(`${baseURL}/show/detail/medicine/${MedicineId}`);
    return response.data;
}

const getDataCustomerWithPhone = async (PhoneNumber) => {
    let response = await axios.get(`${baseURL}/app/get/customer/${PhoneNumber}`);
    return response.data;
}

const buyPrescription = async (dataPrescription) => {
    let response = await axios.post(`${baseURL}/app/buy/prescription`, {
        dataPrescription
    });
    return response.data;
}

const updateStatusOnline = async (Email , Status) => {
    let response = await axios.put(`${baseURL}/update/status/online/${Email}` ,{
        Status
    });
    return response.data;
}   

export {
    handleLoginApp,
    updateStatusOnline,
    getCategory,
    getMedicine,
    getMedicineWithId,
    getDataCustomerWithPhone,
    buyPrescription
}