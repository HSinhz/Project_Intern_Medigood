import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useUser } from "../views/UserContext";
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});
  
instance.defaults.withCredentials = true;
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    switch (status) {
      // authentication (token related issues)
      case 401: {
        localStorage.removeItem('account');
        window.location.href = '/login'
        return 1;
      }

      // forbidden (permission related issues)
      case 403: {
        window.location.href = 'medigood'
        return 1;
      }
      
      case 404: {
        return 1;
      }
      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  
});

export default instance;

