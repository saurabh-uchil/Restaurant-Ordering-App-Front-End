import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import axios from "axios";
import { ArrowLeft, Check } from "lucide-react";

import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { useGetOrderById, useValidateSession } from "../../api/apihooks/useOrder";

import CustomerHeader from "./CustomerHeader";
import OrderItems from "./OrderItems";

import { ContentState } from "../ContentState";
import { orderConfirmationStyles as styles } from "../../styles/CustomerPage/orderConfirmation";
import { serviceCharge, taxCharge } from "../../data/serviceCharges";
import { useEffect } from "react";
import { socket } from "../../api/apihooks/useSocket";
import OrderTimeline from "./OrderTimeline";
import Notification from "../Notification";
import { useTimedNotification, type TimedNotificationValue } from "../../hooks/useTimedNotification";

const OrderConfirmation = () => {
  const { restaurant, orderId } = useParams<{
    restaurant: string;
    orderId: string;
  }>();

  const restaurantSlugName = restaurant ?? "";

  const navigate = useNavigate();
  const location = useLocation();
  const initialNotification = (location.state as { notification?: TimedNotificationValue } | null)?.notification ?? null;
  const { notification, dismissNotification } = useTimedNotification(initialNotification);

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");
  const {
    data: sessionValidation,
    isPending: isSessionPending,
    isFetching: isSessionFetching,
    isError: isSessionError,
    error: sessionError,
  } = useValidateSession();

  const {
    data: restaurantDetails,
    isPending: isRestaurantPending,
    isError: isRestaurantError,
    error: restaurantError,
  } = useRestuarant(restaurantSlugName);

  const {
    data,
    isPending: isOrderPending,
    isFetching: isOrderFetching,
    isFetchedAfterMount: orderFetchedAfterMount,
    isError: isOrderError,
    error: orderError,
    refetch,
  } = useGetOrderById(orderId ?? "");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Customer socket connected:", socket.id);
    });

    const handleOrderUpdate = (update: any) => {
      refetch();
    };

    socket.on("customerOrderUpdate", handleOrderUpdate);

    return () => {
      socket.off("customerOrderUpdate", handleOrderUpdate);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (initialNotification) {
      navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
    }
  }, [initialNotification, location.pathname, location.search, navigate]);

  // Validate URL
  if (!restaurantSlugName || !orderId || !table) {
    return (
      <ContentState
        type="error"
        title="Invalid order link"
        description="Please return to the menu and try again."
      />
    );
  }

  // Loading
  if (
    isRestaurantPending ||
    isOrderPending ||
    (isOrderFetching && !orderFetchedAfterMount) ||
    isSessionPending ||
    isSessionFetching
  ) {
    return (
      <ContentState
        type="loading"
        title="Loading order details..."
        description="Getting everything ready for you."
      />
    );
  }

  if (isSessionError && axios.isAxiosError(sessionError) && sessionError.response?.status === 401) {
    return <Navigate to={`/restaurant/${restaurantSlugName}?table=${encodeURIComponent(table)}`} replace />;
  }

  if (isSessionError) {
    return (
      <ContentState
        type="error"
        title="Unable to check your session"
        description={sessionError instanceof Error ? sessionError.message : "Please check your connection and try again."}
      />
    );
  }

  // Restaurant request error
  if (isRestaurantError) {
    return (
      <ContentState
        type="error"
        title="Unable to load order confirmation"
        description={
          restaurantError?.message ||
          "Something went wrong while loading your order."
        }
      />
    );
  }

  // Restaurant not found
  if (!restaurantDetails) {
    return (
      <ContentState
        type="empty"
        title="Restaurant not found"
        description="This restaurant may no longer be available."
      />
    );
  }

  const session = sessionValidation?.session;
  const sessionMatchesPage = Boolean(
    sessionValidation?.valid &&
    String(session?.restaurantId) === String(restaurantDetails._id) &&
    Number(session?.table) === Number(table),
  );

  if (!sessionMatchesPage) {
    return <Navigate to={`/restaurant/${restaurantSlugName}?table=${encodeURIComponent(table)}`} replace />;
  }

  if (isOrderError) {
    return (
      <ContentState
        type="error"
        title="Unable to load order confirmation"
        description={orderError?.message || "Something went wrong while loading your order."}
      />
    );
  }

  // Order not found
  if (!data) {
    return (
      <ContentState
        type="empty"
        title="Order not found"
        description="We couldn't find the order you're looking for."
      />
    );
  }

  return (
    <div className={styles.page}>
      <CustomerHeader
        restaurant={restaurantDetails.name}
        restaurantId={restaurantDetails._id}
        slug={restaurantSlugName}
        table={table}
      />

      {notification && (
        <Notification
          variant={notification.variant}
          message={notification.message}
          onClose={dismissNotification}
        />
      )}

      <div className={styles.container}>
        <main className={styles.content}>
          {/* Success */}

          <section className={styles.confirmation}>
            <div className={styles.successIcon}>
              <div className={styles.successIconInner}>
                <Check size={28} strokeWidth={2.5} />
              </div>
            </div>

            <h1 className={styles.title}>Order Confirmed</h1>

            <div className={styles.orderMeta}>
              <span className={styles.orderNumber}>
                Order #{data.orderNumber}
              </span>

              <span className={styles.dot}>•</span>

              <span>Table {data.table}</span>
            </div>
          </section>

          {/* Order Status */}
          <section className={styles.statusCard}>
            <h2 className={styles.cardTitle}>Order Status</h2>

            <div className={styles.statusContent}>
              <OrderTimeline status={data.status} />
            </div>
          </section>
          {/* Order */}
          <section className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Your Order</h2>

            <OrderItems items={data.items} />

            <div className={styles.breakdown}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>${data.subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.breakdown}>
              <div className={styles.row}>
                <span>Service Fee</span>
                <span>
                  ${(data.subtotal * (serviceCharge / 100)).toFixed(2)}
                </span>
              </div>
            </div>

            <div className={styles.breakdown}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>${(data.subtotal * (taxCharge / 100)).toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${data.total.toFixed(2)}</span>
            </div>
          </section>

          {/* Back to menu */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() =>
                navigate(
                  `/restaurant/${restaurantSlugName}/menu?table=${table}`,
                )
              }
            >
              <ArrowLeft size={17} />
              <span>Back to Menu</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderConfirmation;

