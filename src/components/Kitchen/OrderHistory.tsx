import { useParams } from "react-router";
import KitchenHeader from "./KitchenHeader";
import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { useSidebar } from "../../hooks/useSidebar";
import { kitchenLinks } from "../../data/kitchenDashboardLinks";
import SideNav from "../DashboardComponents/SideNav";
import { styles as OrderHistoryStyles } from "../../styles/Kitchen/OrderHistory";
import { useGetCompletedOrdersByRestaurantId } from "../../api/apihooks/useOrder";
import OrderHistoryTable from "./OrderHistoryTable";

const OrderHistory = () => {
  const { restaurant } = useParams<{ restaurant: string }>();

  const restaurantSlugName = restaurant ?? "";

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

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useGetCompletedOrdersByRestaurantId(data?._id || "");

  if (ordersData) {
    console.log("Completed Orders Data:", ordersData);
  }

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
          <div className={OrderHistoryStyles.heading}>
            <p className={OrderHistoryStyles.eyebrow}>ORDERS</p>

            <p className={OrderHistoryStyles.subtitle}>
              View and search completed orders from your restaurant.
            </p>
          </div>

          <OrderHistoryTable orders={ordersData ?? []} />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;