import { useNavigate } from "react-router";

const Error401 = () => {
  const navigate = useNavigate();
  
  const handleNavigation= (path:string) =>{
    navigate(path);
  }  

  return (
    <div>
      User Not Authorised
      <div>
        <button className="border border-slate-400 rounded bg-blue-200 text-red-500 mt-2 mb-2 mr-2 p-2" onClick={()=>handleNavigation("/login")}>Back To Login</button>
        <button className="border border-slate-400 rounded bg-blue-200 text-red-500 mt-2 mb-2 mr-2 p-2" onClick={()=>handleNavigation("/getStarted")}>New User..? Register..</button>
      </div>
    </div>
  )
}

export default Error401;
