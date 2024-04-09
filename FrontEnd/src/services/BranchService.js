import axios from "../config/axios";

const getBranch = async () => {
    const response = await axios.get('/show/branch');
    return response.data;
}
export  {
    getBranch
}