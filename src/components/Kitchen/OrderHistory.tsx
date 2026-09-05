import { useParams } from "react-router";
import KitchenHeader from "./KitchenHeader";
import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { useSidebar } from "../../hooks/useSidebar";

const OrderHistory = () => {

const { restaurant } = useParams<{ restaurant: string }>();

  const restaurantSlugName = restaurant ?? "";

  // Get restaurant
  const {
    data,
    isPending,
    isError,
    error,
  } = useRestuarant(restaurantSlugName);

  const {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
  } = useSidebar();

  return (
    <div>
      <KitchenHeader
        name={data.name}
        toggle={toggleSidebar}
      />
    </div>
  )
}

export default OrderHistory
