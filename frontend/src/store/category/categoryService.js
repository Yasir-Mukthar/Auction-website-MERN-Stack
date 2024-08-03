import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

export const getAllCategories = async () => {
  const response = await axios.get(`${API_URL}/product-categories`);
  //console.log("response categories", response.data);
  return response.data;
};

//createCategory
export const createCategory = async (data) => {
  const response = await axios.post(`${API_URL}/product-categories`, data, {
    withCredentials: true,
  });
  //console.log("create categories", response.data);

  return response.data;
};

//get a single category
export const getSingleCategory = async (id) => {
  const response = await axios.get(`${API_URL}/product-categories/${id}`);
  //console.log("response category", response.data);
  return response.data.data;
};

//update a category
export const updateCategory = async (data) => {
  //console.log(data.id, data.data, ",,,,,,,,");
  const response = await axios.put(
    `${API_URL}/product-categories/${data.id}`,
    data.data,
    {
      withCredentials: true,
    }
  );
  //console.log("response category", response.data);
  return response.data.data;
};

//delete a category
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/product-categories/${id}`, {
    withCredentials: true,
  });
  //console.log("response category", response.data);
  return response.data;
};


//get more detail about category
 export const getCategoriesMoreDetail = async () => {

  const response = await axios.get(`${API_URL}/product-categories/detail`, {
    withCredentials: true,
  });
  //console.log("response categories", response.data);
  return response.data.data;
}

//top 5 categoriess
export const getTopCategories = async () => {
  const response = await axios.get(`${API_URL}/product-categories/top`, {
    withCredentials: true,
  });
  //console.log("response categories", response.data);
  return response.data.data;
};

const categoryService = {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
    deleteCategory,
    getCategoriesMoreDetail,
    getTopCategories,
};

export default categoryService;
