import axios from 'axios';




const API_URL = 'http://localhost:8000/api/v1';


const register = async (user) => {
    
        const response = await axios.post(`${API_URL}/users/register`, user);
        //console.log('response register', response.data);
        return response.data;
};

const login = async (user) => {

    const response = await axios.post(`${API_URL}/users/login`, user, {withCredentials: true});
    // save to localStorage
    //console.log('response login', response.data.data.message);
    
    if(response.data.data.user){
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
    } 



    return response.data;
   
};

const logout = async () => {
  

    const response = await axios.post(`${API_URL}/users/logout`,{},{withCredentials: true});
    localStorage.removeItem('user');
    window.location.href = '/';
    return response.data;
};


// Send reset password email
const forgotPasswordSendMail = async (email) => {
    const response = await axios.post(`${API_URL}/users/forgot-password`, email);
    //console.log('response forgotPasswordSendMail', response.data)
    return response.data;
}

// Reset password
const resetNewPassword = async (data) => {
    const response = await axios.post(`${API_URL}/users/reset-password/${data.id}/${data.token}`, data);
    //console.log('response resetNewPassword', response.data)
    return response.data;
}

const changeCurrentPassword = async (data) => {
    //console.log('data', data)
    const response = await axios.put(`${API_URL}/users/change-password`, data, { withCredentials:true });
    //console.log('response changePassword', response.data)
    return response.data;
}

// Get the logged in user data

const getCurrentUser = async () => {
//console.log('getCurrentUser');
    const response = await axios.get(`${API_URL}/users/current-user`, { withCredentials:true });
    //console.log('response getCurrentUser', response.data)
     if(response.data.data.user){
        //console.log('getCurrentUser........', response.data.data.user);
         localStorage.setItem("user", JSON.stringify(response.data.data.user)); 
     } 
    return response.data;
}

const updateProfile = async (data) => {
    //console.log('data', data)
    const response = await axios.put(`${API_URL}/users/update-user-profile`, data, { withCredentials:true });
   
    //console.log('response updateProfile', response.data)
    return response.data;
}







const authService = {
    register
    ,login
    ,logout
    ,forgotPasswordSendMail
    ,resetNewPassword
    ,changeCurrentPassword
    ,getCurrentUser
    ,updateProfile
}

export default authService;