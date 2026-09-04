import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { useEditOrderStatus, useGetActiveOrdersByRestaurantId } from "../../api/apihooks/useOrder";
import { socket } from "../../api/apihooks/useSocket";

import { ContentState } from "../ContentState";
import KitchenHeader from "./KitchenHeader";
import OrderStatusCard from "./OrderStatusCard";
import SideNav from "../DashboardComponents/SideNav";
import OrderSection from "./OrdersSection";
import KitchenOrderCard from "./KitchenOrderCards";

import { useSidebar } from "../../hooks/useSidebar";
import { kitchenLinks } from "../../data/kitchenDashboardLinks";
import { kitchenStyles as styles } from "../../styles/Kitchen/KitchenDashboard";

import type { KitchenOrderStatus } from "./KitchenOrderCards";

const Kitchen = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  const { restaurant } = useParams<{ restaurant: string }>();

  const restaurantSlugName = restaurant ?? "";

  // Get restaurant
  const {
    data,
    isPending,
    isError,
    error,
  } = useRestuarant(restaurantSlugName);

  // Get active orders once restaurant ID is available
  const {
    data: orders = [],
    isPending: isActiveOrdersPending,
    isError: isActiveOrdersError,
    error: activeOrdersError,
    refetch,
  } = useGetActiveOrdersByRestaurantId(data?._id || "");

  // Listen for new order events
  useEffect(() => {
    socket.connect();

    const handleOrderUpdate = async (updatedOrder: {
      orderId: number;
      orderStatus: string;
    }) => {
      console.log("Received order update:", updatedOrder);

      // Show notification
      setNotification({
        show: true,
        message: `New Order Received: Order #${updatedOrder.orderId}`,
      });

      // Refetch orders from backend
      const result = await refetch();

      console.log("Orders after refetch:", result.data);

      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification({
          show: false,
          message: "",
        });
      }, 5000);
    };

    socket.on("orderUpdate", handleOrderUpdate);

    return () => {
      socket.off("orderUpdate", handleOrderUpdate);
      socket.disconnect();
    };
  }, [refetch]);

  const {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
  } = useSidebar();

  // Split orders by status
  const newOrders = orders.filter(
    (order) => order.status === "received",
  );

  const preparingOrders = orders.filter(
    (order) => order.status === "preparing",
  );

  const readyOrders = orders.filter(
    (order) => order.status === "ready",
  );

  const {mutateAsync, isPending: isEditPending, isError: isEditError, error: editError} = useEditOrderStatus();

  const handleStatusChange = async (
    orderId: string,
    status: KitchenOrderStatus,
  ) => {
    // We'll handle the status update API/socket here later
    console.log("Status change:", orderId, status);
    alert(`Status change for Order ID: ${orderId} to ${status}`);
    const response = await mutateAsync({orderId, newStatus: status});
    await refetch();
    console.log(response.data);
  };

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
          error?.message ||
          "Something went wrong while loading the restaurant."
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
  if (isActiveOrdersPending) {
    return (
      <ContentState
        type="loading"
        title="Loading orders..."
        description="Getting the latest kitchen orders."
      />
    );
  }

  // Orders error
  if (isActiveOrdersError) {
    return (
      <ContentState
        type="error"
        title="Unable to load orders"
        description={
          activeOrdersError?.message ||
          "Something went wrong while loading the orders."
        }
      />
    );
  }

  // Dynamic order statistics
  const orderStats = (
    <div className={styles.statusGrid}>
      <OrderStatusCard
        status="New Orders"
        stats={newOrders.length}
      />

      <OrderStatusCard
        status="Preparing"
        stats={preparingOrders.length}
      />

      <OrderStatusCard
        status="Ready"
        stats={readyOrders.length}
      />
    </div>
  );

  return (
    <div className={styles.page}>
      <KitchenHeader
        name={data.name}
        toggle={toggleSidebar}
      />

      <div className={styles.container}>
        <SideNav
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          links={kitchenLinks(restaurantSlugName)}
          exactPath={`/restaurant/${restaurantSlugName}/kitchen`}
        />

        <main className={styles.content}>
          {/* Notification */}
          {notification.show && (
            <div className={styles.notification}>
              <div className={styles.notificationIcon}>
                ✓
              </div>

              <div className={styles.notificationContent}>
                <p className={styles.notificationTitle}>
                  New order received
                </p>

                <p className={styles.notificationMessage}>
                  {notification.message}
                </p>
              </div>
            </div>
          )}

          {/* Order statistics */}
          {orderStats}

          {/* Active orders */}
          <section className={styles.ordersSection}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  Active Orders
                </h2>

                <p className={styles.sectionDescription}>
                  Orders that need attention.
                </p>
              </div>
            </div>

            <div className={styles.orderBoard}>
              {/* New Orders */}
              <OrderSection
                title="New Orders"
                count={newOrders.length}
              >
                {newOrders.map((order) => (
                  <KitchenOrderCard
                    key={order._id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </OrderSection>

              {/* Preparing */}
              <OrderSection
                title="Preparing"
                count={preparingOrders.length}
              >
                {preparingOrders.map((order) => (
                  <KitchenOrderCard
                    key={order._id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </OrderSection>

              {/* Ready */}
              <OrderSection
                title="Ready"
                count={readyOrders.length}
              >
                {readyOrders.map((order) => (
                  <KitchenOrderCard
                    key={order._id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </OrderSection>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Kitchen;
