import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reset } from "../store/auth/authSlice";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";

// const categories = [
//   //key value, name
//   {
//     _id: "65e89abf3c1083d3c16449f0",
//     name: "Electronics",
//     value: "electronics",
//   },
//   { _id: "65e89abf3c1083d3c16449f0", name: "Fashion", value: "fashion" },
//   {
//     _id: "65e89abf3c1083d3c16449f0",
//     name: "Home & Living",
//     value: "home-living",
//   },
// ];

// const locationData = [
//   //key value ,name
//   { _id: "1", name: "Lahore", value: "lahore" },
//   { _id: "2", name: "Karachi", value: "karachi" },
//   { _id: "3", name: "Islamabad", value: "islamabad" },
//   { _id: "4", name: "Multan", value: "multan" },
// ];

const SearchLocationCategory = () => {
  const [filter, setFilter] = useState({
    location: "",
    category: "",
    itemName: "",
  });

  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, []);

  // console.log(categories, "categories")
  // console.log(cities, "cities")

  const SearchByFilter = () => {
    console.log(filter, "filter ssss ");

    dispatch(getAllAuctions(filter));
  };

  return (
    <div className="flex justify-center items-center my-5 min-h-[100px]">
      <div className="flex-col   sm:flex-row sm:items-center   bg-[#061224] text-[#7386a8] rounded-md p-2">
        <select
          required
          id="category"
          className="bg-[#061224] px-2 text-[#7386a8] w-full block sm:w-auto sm:inline  py-3  rounded-lg outline-none border border-border-info-color cursor-pointer"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        >
          <option value="">Select Location</option>
          {cities.data &&
            cities.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        <select
          required
          id="category"
          className="bg-[#061224] px-2 text-[#7386a8] w-full mt-2 sm:w-auto   sm:ml-4 block sm:inline   py-3  rounded-lg outline-none border border-border-info-color cursor-pointer"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.data &&
            categories.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Search Name"
          className="bg-[#061224] py-3 px-3 text-[#7386a8] mt-2 block sm:w-auto sm:inline rounded-lg  border border-border-info-color sm:mx-4 outline-none placeholder:text-[#7386a8]"
          value={filter.itemName}
          onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
        />
        <button
          className="bg-theme-color mt-2  hover:bg-color-danger text-white text-sm font-bold  rounded-md my-auto px-3 py-2  text-center no-underline border-none"
          onClick={() => SearchByFilter()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchLocationCategory;
