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
          <p>Here you can view the history of all orders placed in your restaurant.</p>
          <p>Sample past orders in a table</p>
          <table>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>1</td>
              <td>2023-10-01</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2023-10-02</td>
              <td>Pending</td>
            </tr>
          </table> 
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
