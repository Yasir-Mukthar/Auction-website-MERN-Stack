import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, reset, updateProfile } from "../store/auth/authSlice";

const AccountSetting = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user, "user.......");
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email,
    gender: user?.gender || "",
    address: user?.address || "",
    city: user?.city || "",
    userType: user?.userType || "",
    description: user?.description || "",
    phone: user?.phone || "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect........");
    dispatch(getCurrentUser());
  }, []);

  const [imgUrl, setImgUrl] = useState(user?.profilePicture);
  const imgRef = useRef(null);
  console.log(imgUrl, "imgUrl......");
  console.log(user?.profilePicture, "user?.profilePicture........");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(imgUrl, "imgUrl");
    //image data so use new formdata
    const data = new FormData();
    console.log(formData);

    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("gender", formData.gender);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("userType", formData.userType);
    data.append("description", formData.description);
    data.append("phone", formData.phone);
    if (imgRef.current.files[0]) {
    data.append("profilePicture", imgRef.current.files[0]);
    } else{
      data.append("profilePicture", imgUrl);
    }
    console.log(imgUrl);
    dispatch(updateProfile(data));
    setImgUrl(null);
    dispatch(getCurrentUser());

    dispatch(reset());
  };

  return (
    <div className="bg-green-700 text-black">
      <h1>Account Setting</h1>

      <form onSubmit={handleFormSubmit}>
        <img
          src={imgUrl ? imgUrl : user?.profilePicture}
          alt="upload img"
          onClick={() => imgRef.current.click()}
          className="w-full h-80  mb-4  
                    rounded-lg border-2 border-solid border-red-300  object-contain  cursor-pointer
                    "
        />

        <input
          type="file"
          className="hidden"
          onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
          ref={imgRef}
        />

        <input
          type="text"
          placeholder="FullName"
          value={formData.fullName}
          name="fullName"
          required
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <br />
        <input
        required
          type="email"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <br />
        {/* {select fielsd} */}

        <select
          value={formData.gender}
          name="gender"
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <br />
        <input
          type="text"
          placeholder="address"
          value={formData.address}
          name="address"
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <br />
        <input
          type="text"
          placeholder="city"
          value={formData.city}
          name="city"
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <br />
        <select
          value={formData.userType}
          name="userType"
          onChange={(e) =>
            setFormData({ ...formData, userType: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
        <br />
        <textarea
          cols="30"
          rows="10"
          placeholder="description"
          value={formData.description}
          name="description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>

        <input
          type="number"
          placeholder="phone number"
          value={formData.phone}
          name="phone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default AccountSetting;
