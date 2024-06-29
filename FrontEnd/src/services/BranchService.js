import axios from "../config/axios";

const getBranch = async () => {
    const response = await axios.get('/show/branch');
    return response.data;
}

const getBranchById = async () => {
    const response = await axios.get('/show/branch/id/');
    return response.data;
}
export  {
    getBranch,
    getBranchById
}