// import axios from "axios";
import axios from "../config/axios";

const loginUser = async ( Email, Password ) => {
    const response = await axios.post('/login', {
        Email, Password
    } , {
        withCredentials: true
    })
    return response.data;
}



const homePage = async () => {
    const response =await axios.get('/home',{
        withCredentials: true
    })
    return response.data;
}

const testpermission = async () => {
    const response =await axios.get('/position')
    return response.data;
}

const testmiddleware = async () => {
    const response =await axios.get('/testmdw', {
        withCredentials: true
    })
    return response.data;
}
export {
    loginUser,
    homePage,
    testpermission,
    testmiddleware
}