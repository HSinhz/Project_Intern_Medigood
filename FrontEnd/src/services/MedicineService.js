import axios from "../config/axios";


const showMedicine = async () => {
    const response = await axios.get('/medicine/show/');
    return response.data;
}

const getType = async () => {
    const response = await axios.get('/show/medicine/type');
    return response.data;
}


const getCategory = async () => {
    const response = await axios.get('/show/medicine/category');
    return response.data;
}

const createMedicine = async (image) => {
    const response = await axios.post('/create/medicine/', image);
    return response.data;
}

const getMedicineById = async (medicineId) => {
    const response = await axios.get(`/medicine/show/detail/${medicineId}`);
    return response.data;
}

export  {
    showMedicine,
    getCategory,
    createMedicine,
    getType,
    getMedicineById
}