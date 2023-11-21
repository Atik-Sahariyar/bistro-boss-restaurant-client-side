import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use((config) =>{
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    });
   
    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async(error) =>{
        const status = error.response?.status;
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;