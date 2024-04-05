import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';



export const getNotificationForUser = async () => {
    const response = await axios.get(`${API_URL}/notifications/get-notifications`, {
        withCredentials: true,
        
    });
    console.log(response.data, " response from getNotificationForUser");
    return response.data;
  };


export const markNotificationAsRead= async (id) => {
    const response = await axios.put(`${API_URL}/notifications/mark-as-read/${id}`, {}, {
        withCredentials: true,
        
    });
    console.log(response.data, " response from markNotificationAsRead");
    return response.data;
  };
   









const notificationService= {
    getNotificationForUser,
    markNotificationAsRead
}


export default notificationService;