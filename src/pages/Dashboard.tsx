import { Outlet } from "react-router";
import Navbar from "../components/DashboardComponents/Navbar";
import SideNav from "../components/DashboardComponents/SideNav";

const Dashboard = () => {
  return (
    <div>

      <Navbar />

      <div className="flex h-screen">
        
        <SideNav />

        <main className="flex-1 p-6">
            <Outlet />
        </main>

      </div>
      
    </div>
  )
}

export default Dashboard
