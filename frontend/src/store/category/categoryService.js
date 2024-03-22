import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';



export const getAllCategories = async () => {
    const response = await axios.get(`${API_URL}/product-categories`);
        console.log('response categories', response.data);
        return response.data;
}
















const categoryService= {
    getAllCategories
}


export default categoryService;