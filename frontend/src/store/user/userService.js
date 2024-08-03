import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1';


const getAllUsers=async () => {
    const response = await axios.get(`${API_URL}/users`,{
        withCredentials:true
    
    });
        //console.log('response get all users', response.data);
        return response.data;
}

//get single user by id
const getUserById=async (data) => {
    const response = await axios.get(`${API_URL}/users/${data}`,{
        withCredentials:true
    });
    //console.log('response get single user', response.data);
    return response.data.data.user;
}

//update user by id update-user/665199e75a0743671dff61c1
const updateUserById=async (data) => {
    const response = await axios.put(`${API_URL}/users/update-user/${data.id}`,data.data,{
        withCredentials:true
    });
    //console.log('response update user', response.data);
    return response.data.data.user;
}


//delete a user by id
const deleteUserById=async (data) => {
    const response = await axios.delete(`${API_URL}/users/${data}`,{
        withCredentials:true
    });
    //console.log('response delete user', response.data);
    return response.data;
}

//get top sellers
const getTopSellers=async () => {
    const response = await axios.get(`${API_URL}/users/top-sellers`,{
        withCredentials:true
    });
    //console.log('response get top sellers', response.data);
    return response.data.data;
}



const userService={
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getTopSellers,

}

export default userService;