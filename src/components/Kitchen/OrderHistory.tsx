import { useParams } from "react-router";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import KitchenHeader from "./KitchenHeader";
import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { useSidebar } from "../../hooks/useSidebar";
import { kitchenLinks } from "../../data/kitchenDashboardLinks";
import SideNav from "../DashboardComponents/SideNav";
import { styles as OrderHistoryStyles } from "../../styles/Kitchen/OrderHistory";
import { useGetCompletedOrdersByRestaurantId } from "../../api/apihooks/useOrder";
import OrderHistoryTable from "./OrderHistoryTable";
import type { KitchenOrder } from "../../types/KitchenOrder";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import Pagination from "./Pagination";
import { ContentState } from "../ContentState";

const OrderHistory = () => {
  const { restaurant } = useParams<{ restaurant: string }>();

  const restaurantSlugName = restaurant ?? "";

  const [selectedOrder, setSelectedOrder] = useState<KitchenOrder | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError, error } =
    useRestuarant(restaurantSlugName);

  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useGetCompletedOrdersByRestaurantId(data?._id || "");

  const ordersPerPage = 10;

  // Invalid restaurant URL
  if (!restaurantSlugName) {
    return (
      <ContentState
        type="error"
        title="Invalid restaurant"
        description="The restaurant link is invalid."
      />
    );
  }

  // Restaurant loading
  if (isPending) {
    return (
      <ContentState
        type="loading"
        title="Loading kitchen..."
        description="Getting everything ready."
      />
    );
  }

  // Restaurant error
  if (isError) {
    return (
      <ContentState
        type="error"
        title="Unable to load restaurant"
        description={
          error?.message || "Something went wrong while loading the restaurant."
        }
      />
    );
  }

  // Restaurant not found
  if (!data) {
    return (
      <ContentState
        type="empty"
        title="Restaurant not found"
        description="This restaurant may no longer be available."
      />
    );
  }

  // Orders loading
  if (isOrdersLoading) {
    return (
      <div className={OrderHistoryStyles.page}>
        <KitchenHeader name={data.name} toggle={toggleSidebar} />

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

              <h1 className={OrderHistoryStyles.title}>
                Order History
              </h1>

              <p className={OrderHistoryStyles.subtitle}>
                View and search completed orders from your restaurant.
              </p>
            </div>

            <div className={OrderHistoryStyles.ordersState}>
              <div className={OrderHistoryStyles.loadingState}>
                <span className={OrderHistoryStyles.loader} />

                <p className={OrderHistoryStyles.loadingText}>
                  Loading orders...
                </p>

                <p className={OrderHistoryStyles.loadingDescription}>
                  Fetching completed orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Orders error
  if (isOrdersError) {
    return (
      <div className={OrderHistoryStyles.page}>
        <KitchenHeader name={data.name} toggle={toggleSidebar} />

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

              <h1 className={OrderHistoryStyles.title}>
                Order History
              </h1>

              <p className={OrderHistoryStyles.subtitle}>
                View and search completed orders from your restaurant.
              </p>
            </div>

            <div className={OrderHistoryStyles.ordersState}>
              <div className={OrderHistoryStyles.errorState}>
                <div className={OrderHistoryStyles.errorIcon}>
                  <AlertCircle size={20} />
                </div>

                <p className={OrderHistoryStyles.errorTitle}>
                  Unable to load orders
                </p>

                <p className={OrderHistoryStyles.errorDescription}>
                  {ordersError?.message ||
                    "Something went wrong while loading the orders."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No completed orders
  if (!ordersData || ordersData.length === 0) {
    return (
      <div className={OrderHistoryStyles.page}>
        <KitchenHeader name={data.name} toggle={toggleSidebar} />

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

              <h1 className={OrderHistoryStyles.title}>
                Order History
              </h1>

              <p className={OrderHistoryStyles.subtitle}>
                View and search completed orders from your restaurant.
              </p>
            </div>

            <div className={OrderHistoryStyles.ordersState}>
              <div className={OrderHistoryStyles.errorState}>
                <p className={OrderHistoryStyles.errorTitle}>
                  No completed orders
                </p>

                <p className={OrderHistoryStyles.errorDescription}>
                  Completed orders will appear here once orders are completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = currentPage * ordersPerPage;

  const currentOrders = ordersData.reverse().slice(startIndex, endIndex);

  return (
    <div className={OrderHistoryStyles.page}>
      <KitchenHeader name={data.name} toggle={toggleSidebar} />

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

            <h1 className={OrderHistoryStyles.title}>
              Order History
            </h1>

            <p className={OrderHistoryStyles.subtitle}>
              View and search completed orders from your restaurant.
            </p>
          </div>

          <OrderHistoryTable
            orders={currentOrders}
            selectOrder={setSelectedOrder}
          />

          <Pagination
            currentPage={currentPage}
            ordersPerPage={ordersPerPage}
            totalOrders={ordersData.length}
            onPageChange={setCurrentPage}
          />

          <OrderDetailsDrawer
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;