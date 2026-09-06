import { useParams } from "react-router";
import KitchenHeader from "./KitchenHeader";
import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { useSidebar } from "../../hooks/useSidebar";
import { kitchenLinks } from "../../data/kitchenDashboardLinks";
import SideNav from "../DashboardComponents/SideNav";
import { styles as OrderHistoryStyles } from "../../styles/Kitchen/OrderHistory";

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
    <div className={OrderHistoryStyles.page}>
      <KitchenHeader
        name={data.name}
        toggle={toggleSidebar}
      />

      <div className={OrderHistoryStyles.container}>
        <SideNav
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          links={kitchenLinks(restaurantSlugName)}
          exactPath={`/restaurant/${restaurantSlugName}/kitchen`}
        />

        <div className={OrderHistoryStyles.content}>
          <h1>Order History</h1>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
