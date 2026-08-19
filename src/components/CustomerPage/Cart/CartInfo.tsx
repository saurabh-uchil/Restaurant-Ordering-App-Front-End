import { Leaf } from "lucide-react";
import { cartInfoStyles as styles } from "../../../styles/cart";

type CartInfoProps = {
  table: string;
};

const CartInfo = ({ table }: CartInfoProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.headingContainer}>
        <p className={styles.title}>Your Cart</p>

        <div className={styles.meta}>
          <span>Table {table}</span>
          <span className={styles.dot}>•</span>
          <span>Dine-in</span>
        </div>
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerIcon}>
          <Leaf size={20} />
        </div>

        <p className={styles.bannerText}>
          Great choice! Your order will be freshly prepared.
        </p>
      </div>
    </section>
  );
};

export default CartInfo;