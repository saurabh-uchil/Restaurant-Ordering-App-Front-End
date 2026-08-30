import { useParams } from "react-router-dom";

import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { ContentState } from "../ContentState";

import KitchenHeader from "./KitchenHeader";
import OrderStatusCard from "./OrderStatusCard";

import { kitchenStyles as styles } from "../../styles/Kitchen/KitchenDashboard";
import SideNav from "../DashboardComponents/SideNav";
import { kitchenLinks } from "../../data/kitchenDashboardLinks";
import { useSidebar } from "../../hooks/useSidebar";
import OrderSection from "./OrdersSection";
import { useState } from "react";
import type { KitchenOrderStatus } from "./KitchenOrderCards";
import { mockOrders } from "../../data/kitchenMockOrders";
import type { KitchenOrder } from "../../types/KitchenOrder";
import KitchenOrderCard from "./KitchenOrderCards";

const Kitchen = () => {
  const { restaurant } = useParams<{ restaurant: string }>();

  const restaurantSlugName = restaurant ?? "";

  const { data, isPending, isError, error } = useRestuarant(restaurantSlugName);

  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  const [orders, setOrders] = useState<KitchenOrder[]>(mockOrders);

  const newOrders = orders.filter((order) => order.status === "new");

  const preparingOrders = orders.filter(
    (order) => order.status === "preparing",
  );

  const readyOrders = orders.filter((order) => order.status === "ready");

  const handleStatusChange = (orderId: string, status: KitchenOrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  if (!restaurantSlugName) {
    return (
      <ContentState
        type="error"
        title="Invalid restaurant"
        description="The restaurant link is invalid."
      />
    );
  }

  if (isPending) {
    return (
      <ContentState
        type="loading"
        title="Loading kitchen..."
        description="Getting everything ready."
      />
    );
  }

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

  if (!data) {
    return (
      <ContentState
        type="empty"
        title="Restaurant not found"
        description="This restaurant may no longer be available."
      />
    );
  }

  const orderStats = (
    <div className={styles.statusGrid}>
      <OrderStatusCard status="New Orders" stats={4} />

      <OrderStatusCard status="Preparing" stats={6} />

      <OrderStatusCard status="Ready" stats={2} />
    </div>
  );

  return (
    <div className={styles.page}>
      <KitchenHeader name={data.name} toggle={toggleSidebar} />

      <div className={styles.container}>
        <SideNav
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          links={kitchenLinks(restaurantSlugName)}
          exactPath={`/restaurant/${restaurantSlugName}/kitchen`}
        />

        <main className={styles.content}>
          {orderStats}

          {/* Active orders will go here */}
          <section className={styles.ordersSection}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Active Orders</h2>

                <p className={styles.sectionDescription}>
                  Orders that need attention.
                </p>
              </div>
            </div>

            {/* Order cards will go here */}
            <div className={styles.orderBoard}>
              <OrderSection title="New Orders" count={newOrders.length}>
                {newOrders.map((order) => (
                  <KitchenOrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </OrderSection>

              <OrderSection title="Preparing" count={preparingOrders.length}>
                {preparingOrders.map((order) => (
                  <KitchenOrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </OrderSection>

              <OrderSection title="Ready" count={readyOrders.length}>
                {readyOrders.map((order) => (
                  <KitchenOrderCard
                    key={order.id}
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
