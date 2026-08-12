import { Moon, ShoppingCart } from "lucide-react";
import {customerHeaderStyles as styles} from "../../styles/CustomerPage/customerPage";

type CustomerHeaderProps = {
  restaurant: string;
  table: string|null;
};

const CustomerHeader = ({
  restaurant,
  table,
}: CustomerHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.restaurantInfo}>
        <h1 className={styles.restaurantName}>
          {restaurant}
        </h1>

        <p className={styles.tableNumber}>
          Table {table}
        </p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Switch theme"
        >
          <Moon size={19} />
        </button>

        <button
          type="button"
          className={styles.cartButton}
          aria-label="View cart"
        >
          <ShoppingCart size={21} />

          <span className={styles.cartBadge}>
            0
          </span>
        </button>
      </div>
    </header>
  );
};

export default CustomerHeader;