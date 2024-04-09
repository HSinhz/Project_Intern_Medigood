import axios from "../config/axios";

const getEmployeeWithPagination = async () => {
    const response = await axios.get('/show/emlpoyee');
    return response.data;
}

const getPosition = async () => {
    const response = await axios.get('/show/position');
    return response.data;
}
export  {
    getEmployeeWithPagination,
    getPosition
}