import axios from "../config/axios";


const showMedicine = async () => {
    const response = await axios.get('/medicine/show/');
    return response.data;
}

export  {
    showMedicine
}