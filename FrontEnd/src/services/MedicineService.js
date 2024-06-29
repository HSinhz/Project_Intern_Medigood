import axios from "../config/axios";
import { toast } from "react-toastify";

const showMedicine = async (Id, choose, page, limit) => {
    const response = await axios.get(`/medicine/show/?kind=${choose}&id=${Id}&page=${page}&limit=${limit}`);
    return response.data;
}

const getAllMedic = async () => {
    const response = await axios.get('/show/medicine/all/');
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

const createSupplier = async (dataSupplier) => {
    const response = await axios.post('/create/supplier/', dataSupplier);
    return response.data;
}

const getSupplier = async () => {
    const response = await axios.get('/get/supplier/');
    return response.data;
}

const createPurchaseOrder = async (SupplierId, DataMedicPurchase, TotalQuantity, TotalPurchase) => {
    const response = await axios.post('/create/purchase/', 
    {SupplierId, DataMedicPurchase, TotalQuantity, TotalPurchase });
    return response.data;
}

const createDistributeOrder = async (Branch, TotalQuantity, ListMedicine, Employee) => {
    const response = await axios.post('/create/distribute/', 
    {Branch, TotalQuantity, ListMedicine, Employee });
    return response.data;
}

const getMedicineStockWithId = async (listMedicine) => {
    const response = await axios.post(`/get/medicine/stock/`, {
        listMedicine
    });
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
    getCategoryByIdType,
    getAllMedic,
    createSupplier,
    getSupplier,
    createPurchaseOrder,
    createDistributeOrder,
    getMedicineStockWithId
}