import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';



// export const getAllCities = async () => {
//     const response = await axios.get(`${API_URL}/cities`);
//         //console.log('response cities', response.data);
//         return response.data;
// }{withCredentials:true});


export const getCartItems=async ()=>{
    const response = await axios.get(`${API_URL}/cart`,{
        withCredentials:true
    });
    //console.log('response cart', response.data);
    return response.data.data;
}

export const deleteCartItem=async(id)=>{
    const response = await axios.delete(`${API_URL}/cart/${id}`,{
        withCredentials:true
    });
    //console.log('response delete cart', response.data);
    return response.data.data;
}





const cartService= {
    getCartItems,
    deleteCartItem
}


export default cartService;