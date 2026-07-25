
import { useAuth } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

    console.log("Protected Route");
  const accessToken = useAuth(state => state.accessToken);  

  if(!accessToken){
    return <Navigate to={"/error"} replace/>
}

  return <Outlet />
}

export default ProtectedRoute;
