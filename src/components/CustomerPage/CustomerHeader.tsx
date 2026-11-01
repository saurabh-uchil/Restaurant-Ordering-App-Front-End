import { Moon, ReceiptText, ShoppingCart } from "lucide-react";
import { customerHeaderStyles as styles } from "../../styles/CustomerPage/customerPage";
import { useCart } from "../../store/cartStore";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useGetOrdersForCurrentSession, useValidateSession } from "../../api/apihooks/useOrder";
import OrderHistoryDrawer from "./OrderHistoryDrawer";

type CustomerHeaderProps = {
  restaurant: string,
  restaurantId: string,
  slug: string,
  table: string
};

const CustomerHeader = ({ restaurant, restaurantId, slug, table }: CustomerHeaderProps) => {

  const myCart = useCart((state)=>state.myCart);
  const navigate = useNavigate(); 
  const [ordersDrawerOpen, setOrdersDrawerOpen] = useState(false);
  const {
    data: sessionValidation,
    isPending: validatingSession,
    isFetching: refreshingSession,
    isError: sessionValidationFailed,
  } = useValidateSession();
  const sessionId = sessionValidation?.valid ? sessionValidation.session?.sessionId : undefined;
  const hasMatchingSession = Boolean(
    !validatingSession &&
    !refreshingSession &&
    !sessionValidationFailed &&
    sessionValidation?.valid &&
    String(sessionValidation.session?.restaurantId) === String(restaurantId) &&
    Number(sessionValidation.session?.table) === Number(table),
  );
  const {
    data: sessionOrders = [],
    isPending: loadingSessionOrders,
    isFetching: refreshingSessionOrders,
    isFetchedAfterMount: sessionOrdersFetchedAfterMount,
    isError: sessionOrdersFailed,
    refetch: refetchSessionOrders,
  } = useGetOrdersForCurrentSession(hasMatchingSession, sessionId);
  const loadingOrders = Boolean(
    hasMatchingSession &&
    (!sessionOrdersFetchedAfterMount || loadingSessionOrders || refreshingSessionOrders),
  );
  const ordersFailed = hasMatchingSession && sessionOrdersFailed;
  const orders =
    hasMatchingSession &&
    sessionOrdersFetchedAfterMount &&
    !loadingSessionOrders &&
    !refreshingSessionOrders &&
    !sessionOrdersFailed
      ? sessionOrders
      : [];

  return (
    <header className={styles.header}>
      <div className={styles.restaurantInfo}>
        <h1 className={styles.restaurantName}>{restaurant}</h1>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Switch theme"
        >
          <Moon size={19} />
        </button>

        {hasMatchingSession && (
          <button
            type="button"
            className={styles.orderButton}
            aria-label={loadingOrders ? "Loading table orders" : "View existing table orders"}
            title="View existing orders"
            onClick={() => setOrdersDrawerOpen(true)}
          >
            <ReceiptText size={21} />
            {orders.length > 0 && <span className={styles.orderBadge}>{orders.length}</span>}
          </button>
        )}

        <button
          type="button"
          className={styles.cartButton}
          aria-label="View cart"
          onClick={()=>navigate(`/restaurant/${slug}/cart?table=${table}`)}
        >
          <ShoppingCart size={21} />

          <span className={styles.cartBadge}>{myCart.length}</span>
        </button>
      </div>
      <OrderHistoryDrawer
        open={ordersDrawerOpen}
        orders={orders}
        loading={loadingOrders}
        error={ordersFailed}
        onRetry={() => void refetchSessionOrders()}
        onClose={() => setOrdersDrawerOpen(false)}
      />
    </header>
  );
};

export default CustomerHeader;

