import { ShoppingBag } from "lucide-react";
import { emptyCartStyles as styles } from "../../../styles/cart";

type EmptyCartProps = {
  onBrowseMenu: () => void;
};

const EmptyCart = ({ onBrowseMenu }: EmptyCartProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <ShoppingBag size={28} />
        </div>

        <h1 className={styles.title}>Your cart is empty</h1>

        <p className={styles.description}>
          Looks like you haven't added anything yet. Browse the menu and
          choose something you'll enjoy.
        </p>

        <button
          type="button"
          onClick={onBrowseMenu}
          className={styles.button}
        >
          Browse Menu
        </button>
      </div>
    </section>
  );
};

export default EmptyCart;