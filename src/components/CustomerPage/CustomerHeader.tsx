import { Moon, ShoppingCart } from "lucide-react";
import { customerHeaderStyles as styles } from "../../styles/CustomerPage/customerPage";
import { useCart } from "../../store/cartStore";
import { useNavigate } from "react-router";

type CustomerHeaderProps = {
  restaurant: string,
  slug: string,
  table: string
};

const CustomerHeader = ({ restaurant, slug, table }: CustomerHeaderProps) => {

  const myCart = useCart((state)=>state.myCart);
  const navigate = useNavigate(); 

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
    </header>
  );
};

export default CustomerHeader;
