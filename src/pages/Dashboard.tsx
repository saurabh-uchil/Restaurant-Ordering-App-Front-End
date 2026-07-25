import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/DashboardComponents/Navbar";
import SideNav from "../components/DashboardComponents/SideNav";
import { useCurrentUser } from "../store/authStore";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const currentUser = useCurrentUser(state => state.currentUser);

  return (
    <div className="min-h-screen bg-white">
      <Navbar toggle={toggleSidebar} currentUser={currentUser} />

      <div className="flex">
        <SideNav
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;