import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1';


const getAllUsers=async () => {
    const response = await axios.get(`${API_URL}/users`,{
        withCredentials:true
    
    });
        console.log('response get all users', response.data);
        return response.data;
}




const userService={
    getAllUsers,

}

export default userService;