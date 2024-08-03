import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';



export const getAllCities = async () => {
    const response = await axios.get(`${API_URL}/cities`);
        //console.log('response cities', response.data);
        return response.data;
}

//get top cities by user
export const getTopCitiesByUser = async () => {
    const response = await axios.get(`${API_URL}/users/top-cities`,{
        withCredentials:true
    });
        //console.log('response top cities', response.data);
        return response.data;
}








const cityService= {
    getAllCities,
    getTopCitiesByUser,
}


export default cityService;