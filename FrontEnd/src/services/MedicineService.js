import axios from "../config/axios";


const showMedicine = async (Id, choose, page, limit) => {
    const response = await axios.get(`/medicine/show/?kind=${choose}&id=${Id}&page=${page}&limit=${limit}`);
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

const getCategoryByIdType = async (typeId) => {
    const response = await axios.get(`/show/medicine/category/${typeId}`);
    return response.data;
}

const getUnit = async () => {
    const response = await axios.get('/show/medicine/unit');
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

const editMedicine = async(medicineId, medicineData) => {
    const response = await axios.put(`/edit/medicine/${medicineId}`, medicineData);
    return response.data;
}

const deleteMedicine = async (medicineId) => {
    const response = await axios.delete(`/delete/medicine/${medicineId}`);
    return response.data;
}
export  {
    showMedicine,
    getCategory,
    createMedicine,
    getType,
    getMedicineById,
    getUnit,
    editMedicine,
    deleteMedicine,
    getCategoryByIdType
}