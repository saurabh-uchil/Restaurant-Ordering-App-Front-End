import { useNavigate, useParams, useSearchParams } from "react-router";
import { ArrowLeft, Check, ChefHat } from "lucide-react";

import { useRestuarant } from "../../api/apihooks/useRestaurant";
import { useGetOrderById } from "../../api/apihooks/useOrder";

import CustomerHeader from "./CustomerHeader";
import OrderItems from "./OrderItems";

import { ContentState } from "../ContentState";
import { orderConfirmationStyles as styles } from "../../styles/CustomerPage/orderConfirmation";
import { serviceCharge, taxCharge } from "../../data/serviceCharges";

const OrderConfirmation = () => {
  const { restaurant, orderId } = useParams<{
    restaurant: string;
    orderId: string;
  }>();

  const restaurantSlugName = restaurant ?? "";

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const {
    data: restaurantDetails,
    isPending: isRestaurantPending,
    isError: isRestaurantError,
    error: restaurantError,
  } = useRestuarant(restaurantSlugName);

  const {
    data,
    isPending: isOrderPending,
    isError: isOrderError,
    error: orderError,
  } = useGetOrderById(orderId ?? "");

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
  if (isRestaurantPending || isOrderPending) {
    return (
      <ContentState
        type="loading"
        title="Loading order details..."
        description="Getting everything ready for you."
      />
    );
  }

  // Error
  if (isRestaurantError || isOrderError) {
    return (
      <ContentState
        type="error"
        title="Unable to load order confirmation"
        description={
          restaurantError?.message ||
          orderError?.message ||
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
          slug={restaurantSlugName}
          table={table}
        />
        
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

            <p className={styles.description}>
              Your order has been received and sent to the
              kitchen. We'll let you know when it's ready.
            </p>

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
              <div className={styles.statusIcon}>
                <ChefHat size={19} />
              </div>

              <div>
                <p className={styles.statusTitle}>
                  Order Received
                </p>

                <p className={styles.statusDescription}>
                  The kitchen has received your order and will
                  start preparing it shortly.
                </p>
              </div>
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
                <span>${(data.subtotal * (serviceCharge/100)).toFixed(2)}</span>
              </div>
            </div>

             <div className={styles.breakdown}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>${(data.subtotal * (taxCharge/100)).toFixed(2)}</span>
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
                  `/restaurant/${restaurantSlugName}/menu?table=${table}`
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