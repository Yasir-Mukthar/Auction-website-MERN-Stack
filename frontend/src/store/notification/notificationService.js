import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';



export const getNotificationForUser = async () => {
    const response = await axios.get(`${API_URL}/notifications/get-notifications`, {
        withCredentials: true,
        
    });
    //console.log(response.data, " response from getNotificationForUser");
    return response.data;
  };


export const markNotificationAsRead= async (id) => {
    const response = await axios.put(`${API_URL}/notifications/mark-as-read/${id}`, {}, {
        withCredentials: true,
        
    });
    //console.log(response.data, " response from markNotificationAsRead");
    return response.data;
  };
   


  export  const sendNewBidNotification= async (data) => {
    //console.log(data, " data from sendNewBidNotification");
    const response = await axios.post(`${API_URL}/notifications/send-notification`, data, {
        withCredentials: true,
        
    });
    //console.log(response.data, " response from sendNewBidNotification");
    return response.data;
  };



  export const markAllNotificationsAsRead= async () => {
    const response = await axios.put(`${API_URL}/notifications/mark-all-as-read`, {}, {
        withCredentials: true,
        
    });
    //console.log(response.data, " response from markAllNotificationsAsRead");
    return response.data;
  };








const notificationService= {
    getNotificationForUser,
    markNotificationAsRead,
    sendNewBidNotification,
    markAllNotificationsAsRead,
}


export default notificationService;