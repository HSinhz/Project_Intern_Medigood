import axios from "../config/axios";

const getReport = async (typeReport, start, end) => {
    const response = await axios.get(`/show/report/?type=${typeReport}&start=${start}&end=${end}`);
    return response.data;
}

export {
    getReport
}