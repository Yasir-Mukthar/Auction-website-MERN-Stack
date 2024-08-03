import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector} from "react-redux";


const useAuth = () => {
  const token = Cookies.get("JwtToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if(!token){
    localStorage.removeItem("user")
  }
  //console.log(user, "user,,,,,,,,,,,");
  return token && user;
};

const PublicRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,,,,.......public....");

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return auth ? null : <Outlet />;
};


const AdminPublicRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,,,,.......public....");

  useEffect(() => {
    if (auth) {
      navigate("/admin/users");
    }
  }, [auth, navigate]);

  return auth ? null : <Outlet />;
};

const Protected = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,,,,.......protected....");
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
};

const AdminProtected = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,,,,.......protected....");
  useEffect(() => {
    if (!auth) {
      navigate("/admin/login");
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
};

const SellerRoutes=()=>{
const {user}=useSelector((state)=>state.auth);
  const auth = useAuth();
  const navigate = useNavigate();
//console.log(auth, "auth.,,,,,seller routes,,,...........");
  useEffect(() => {
    if (auth && user.userType !== "seller") {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return auth && user.userType === "seller" ? <Outlet /> : null;
}

const AdminRoutes=()=>{
  const {user}=useSelector((state)=>state.auth);
    const auth = useAuth();
    const navigate = useNavigate();
  //console.log(auth, "auth.,,,,,seller routes,,,...........");
  if (auth && user.userType !== "admin") {
    navigate("/dashboard");
  }
    useEffect(() => {
      if (auth && user.userType !== "admin") {
        navigate("/dashboard");
      }
    }, [auth, navigate]);
  
    return auth && user.userType === "admin" ? <Outlet /> : null;
  }

export { PublicRoute,SellerRoutes, AdminRoutes,AdminProtected , AdminPublicRoute};
export default Protected;
