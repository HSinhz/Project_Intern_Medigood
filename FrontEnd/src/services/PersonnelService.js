import axios from "../config/axios";

const getEmployeeWithPagination = async () => {
    const response = await axios.get('/show/emlpoyee/');
    return response.data;
}

const getPosition = async () => {
    const response = await axios.get('/show/position');
    return response.data;
}

const createPersonal = async (image) => {
    const response = await axios.post('/create/personal/', image);
    return response.data;
}

const editPersonal = async (personalId ,formdata) => {
    const response = await axios.put(`/edit/personal/${personalId}`, formdata);
    return response.data;
}

const deletePersonal = async (personalId) => {
    const response = await axios.delete(`/delete/personal/${personalId}`);
    return response.data;
}
export  {
    getEmployeeWithPagination,
    getPosition,
    createPersonal,
    editPersonal,
    deletePersonal
}