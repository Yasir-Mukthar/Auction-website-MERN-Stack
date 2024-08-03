import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { createCategory, reset } from "../../store/category/categorySlice";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef(null);
 
  const navigate = useNavigate();

    const { isSuccess } = useSelector((state) => state.category);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleProductUpload = (e) => {
    e.preventDefault();
    //image data so use new formdata
    const data = new FormData();
    //console.log(formData);
    data.append("name", formData.name);
    data.append("description", formData.description);

    if (!imgRef.current.files[0]) {
      return alert("Image is required");
    } else if (imgRef.current.files[0].size > 1024 * 1024) {
      return alert("Image size should be less than 1mb");
    } else {
      data.append("image", imgRef.current.files[0]);
    }

    dispatch(createCategory(data))
    if(isSuccess){
        toast.success("category created successfully");
        dispatch(reset());

        navigate("/admin/categories");

    }
    // dispatch(getAllAuctions());


  };

  return (
    <div>
      <form
        className="flex flex-col lg:flex-row gap-8 justify-center lg:w-[100%] m-auto px-4"
        onSubmit={handleProductUpload}
      >
        <div className="text-white lg:w-[22%] lg:min-w-[350px] ">
          <h1 className="text-white text-2xl font-bold mb-4">Upload Item</h1>

          {imgUrl ? (
            <img
              src={imgUrl}
              alt="upload img"
              onClick={() => imgRef.current.click()}
              className="w-full h-80 
                    rounded-lg border-2 border-solid p-2 object-contain cursor-pointer
                    "
            />
          ) : (
            <div
              onClick={() => imgRef.current.click()}
              className="w-full h-80
              rounded-xl border-2 border-dashed border-border-info-color 
                    flex items-center justify-center
                    cursor-pointer
                    "
            >
              <div className="text-center flex flex-col items-center gap-2">
                <IoCloudUploadOutline size={68} className="text-theme-color" />
                <p>Click to Upload</p>
                <span className="text-body-text-color">PNG,JPG,JPEG | Max Size 1MB</span>
              </div>
            </div>
          )}

          <input
            type="file"
            className="hidden"
            onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
            ref={imgRef}
            accept=".png, .jpg, .jpeg"

          />
        </div>
        {/* INPUTS */}
        <div className="flex flex-col gap-4 lg:w-[50%] inputs:outline-none p-8 inputs:px-4 inputs:py-3 inputs:rounded-xl select:px-4 select:py-3 select:rounded-xl select:cursor-pointer border border-border-info-color inputs:bg-theme-bg inputs:border inputs:border-border-info-color focus:inputs:border-theme-color select:border select:border-border-info-color inputs:placeholder-body-text-color text-slate-300 rounded-2xl [&_label]:mb-2 [&_label]:text-body-text-color [&_*]:transition-all">
          <div className="grid">
            <label htmlFor="product_name">Category Name</label>
            <input
              required
              id="product_name"
              placeholder="e.g (Modern Abstract Painting)"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />{" "}
          </div>

         
          <div className="grid">
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Describe your product, art, etc."
              required
              id="description"
              rows="7"
              className="outline-none bg-theme-bg rounded-xl px-3 py-4 border border-border-info-color focus:border-theme-color placeholder-body-text-color"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-4 rounded-xl text-white cursor-pointer font-bold tracking-wide w-full bg-theme-color hover:bg-color-danger"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
