import { useQuery } from "@tanstack/react-query";
import MenuGrid from "../MenuGrid";
import { api } from "../../api/api";
import { useCurrentUser } from "../../store/authStore";
import { PlusIcon, UtensilsCrossed } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import DashboardHeader from "./DashboardHeader";
import Notification from "../Notification";
import { useEffect } from "react";
import { ContentState } from "../ContentState";
import { menuContentStates } from "../../data/validationMessages";

 
const Menu = () => {

  const currentUser = useCurrentUser(state => state.currentUser);

  const location = useLocation();
  const notification = location.state?.notification;

  const {data, isFetching, isError, error} = useQuery({
    queryKey:['menu'],
    queryFn: async()=>{
      const {data} = await api.get(`/restaurant/${currentUser?.restaurant}/menu`);
      console.log(data);
      return data;  
    }
  });

  const view = isFetching
  ? <ContentState {...menuContentStates.loading} />
  : isError
  ? <ContentState {...menuContentStates.error} description={error?.message || menuContentStates.error.description} />
  : !data?.length
  ? <ContentState {...menuContentStates.empty} />
  : <MenuGrid mode="menu" data={data} />;

  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [notification, navigate, location.pathname]);

  const handleCloseNotification = () => {
    navigate(location.pathname, { replace: true });
  }

  return (
    <div>
      <DashboardHeader description="Manage your menu items, pricing and availability." title="Menu" icon={UtensilsCrossed} onButtonClick={()=>{navigate('/dashboard/addItem')}} buttonText="Add Item" buttonIcon={PlusIcon}/>
      {notification && (
      <Notification
        variant={notification.variant}
        message={notification.message}
        onClose={handleCloseNotification}
      />
    )}
      {view}
    </div>
  )
}

export default Menu
