import { Outlet } from "react-router-dom";
import Navbar from "../components/DashboardComponents/Navbar";
import SideNav from "../components/DashboardComponents/SideNav";
import { useCurrentUser } from "../store/authStore";
import { links } from "../data/dashboardLinks";
import { useSidebar } from "../hooks/useSidebar";


const Dashboard = () => {

  const {isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  const currentUser = useCurrentUser(state => state.currentUser);

  return (
    <div className="min-h-screen bg-[#FCFBF9]">
      <Navbar toggle={toggleSidebar} currentUser={currentUser} />

      <div className="flex">
        <SideNav
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          links={links}
          exactPath="/dashboard"
        />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;