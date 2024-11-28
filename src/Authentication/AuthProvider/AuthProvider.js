import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthProvider = () => {
  const navigate = useNavigate();
   
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

 
  return(
    <>
    <Outlet/>
    </>
  )
};

export default AuthProvider;
