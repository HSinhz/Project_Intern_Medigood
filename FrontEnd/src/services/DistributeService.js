import axios from "../config/axios";

const getAllDistributeOrder = async (page, limit) => {
    const response = await axios.get(`/show/distribute/?page=${page}&limit=${limit}`);
    return response.data;
}

const createDistributeBranch = async (Branch, TotalQuantity, ListMedicine, Employee, Status) => {
    const response = await axios.post('/create/distribute/branch/', {
        Branch, TotalQuantity, ListMedicine, Employee, Status
    });
    return response.data;
}

const getDistributeOrderBranch = async (page, limit) => {
    const response = await axios.get(`/show/distribute/branch/?page=${page}&limit=${limit}`);
    return response.data;
}

const getDistributeWithId = async (DistributeId) => {
    const response = await axios.get(`/show/detail-distribute/${DistributeId}`);
    return response.data;
}

const confirmDistributeOrder = async (DataDistribute) => {
    const response = await axios.put(`/confirm/distribute/${DataDistribute.DistributeId}`, {
        DataDistribute
    });
    return response.data;
}

export {
    getAllDistributeOrder,
    createDistributeBranch,
    getDistributeOrderBranch,
    getDistributeWithId,
    confirmDistributeOrder
}