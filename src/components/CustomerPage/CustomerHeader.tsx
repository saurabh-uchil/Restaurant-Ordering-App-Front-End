
import { Moon, ReceiptText, ShoppingCart } from "lucide-react";
import { customerHeaderStyles as styles } from "../../styles/CustomerPage/customerPage";
import { useCart } from "../../store/cartStore";
import { useNavigate } from "react-router";

type CustomerHeaderProps = {
  restaurant: string;
  slug: string;
  table: string;
  existingOrdersCount: number;
  onOrdersClick: () => void;
};

const CustomerHeader = ({
  restaurant,
  slug,
  table,
  existingOrdersCount,
  onOrdersClick,
}: CustomerHeaderProps) => {
  const myCart = useCart((state) => state.myCart);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.restaurantInfo}>
        <h1 className={styles.restaurantName}>{restaurant}</h1>
      </div>

      <div className={styles.actions}>
        {/* Theme Button */}
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Switch theme"
        >
          <Moon size={19} />
        </button>

        {/* Existing Orders Button */}
        <button
          type="button"
          className={styles.ordersButton}
          aria-label={`View ${existingOrdersCount} existing orders`}
          onClick={onOrdersClick}
        >
          <ReceiptText size={21} />
          <span className={styles.ordersBadge}>
            {existingOrdersCount}
          </span>
        </button>

        {/* Cart Button */}
        <button
          type="button"
          className={styles.cartButton}
          aria-label="View cart"
          onClick={() =>
            navigate(`/restaurant/${slug}/cart?table=${table}`)
          }
        >
          <ShoppingCart size={21} />
          <span className={styles.cartBadge}>
            {myCart.length}
          </span>
        </button>
      </div>
    </header>
  );
};

export default CustomerHeader;
