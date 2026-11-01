import { Moon, ReceiptText, ShoppingCart } from "lucide-react";
import { customerHeaderStyles as styles } from "../../styles/CustomerPage/customerPage";
import { useCart } from "../../store/cartStore";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useGetOrdersForCurrentSession, useValidateSession } from "../../api/apihooks/useOrder";
import OrderHistoryDrawer from "./OrderHistoryDrawer";

type CustomerHeaderProps = {
  restaurant: string,
  slug: string,
  table: string
};

const CustomerHeader = ({ restaurant, slug, table }: CustomerHeaderProps) => {

  const myCart = useCart((state)=>state.myCart);
  const navigate = useNavigate(); 
  const [ordersDrawerOpen, setOrdersDrawerOpen] = useState(false);
  const { data: sessionValidation } = useValidateSession();
  const sessionId = sessionValidation?.valid ? sessionValidation.session?.sessionId : undefined;
  const { data: orders = [] } = useGetOrdersForCurrentSession(Boolean(sessionId), sessionId);

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

        {orders.length > 0 && (
          <button
            type="button"
            className={styles.orderButton}
            aria-label={`View ${orders.length} existing ${orders.length === 1 ? "order" : "orders"}`}
            title="View existing orders"
            onClick={() => setOrdersDrawerOpen(true)}
          >
            <ReceiptText size={21} />
            <span className={styles.orderBadge}>{orders.length}</span>
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
        onClose={() => setOrdersDrawerOpen(false)}
      />
    </header>
  );
};

export default CustomerHeader;
