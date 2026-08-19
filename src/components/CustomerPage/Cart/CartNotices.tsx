import { Bell, ShieldCheck, Utensils } from "lucide-react";
import { cartNoticesStyles as styles } from "../../../styles/cart";

const CartNotices = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notice}>
        <div className={styles.icon}>
          <Bell size={17} />
        </div>

        <div>
          <p className={styles.title}>We'll notify the kitchen</p>
          <p className={styles.description}>
            Your order will be sent directly to the kitchen.
          </p>
        </div>
      </div>

      <div className={styles.notice}>
        <div className={styles.icon}>
          <Utensils size={17} />
        </div>

        <div>
          <p className={styles.title}>Freshly prepared</p>
          <p className={styles.description}>
            Your food will be prepared fresh when ordered.
          </p>
        </div>
      </div>

      <div className={styles.notice}>
        <div className={styles.icon}>
          <ShieldCheck size={17} />
        </div>

        <div>
          <p className={styles.title}>Secure & safe</p>
          <p className={styles.description}>
            Your order information is handled securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartNotices;