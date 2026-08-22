import { ArrowRight } from "lucide-react";
import { orderSummaryStyles as styles } from "../../../styles/cart";

type OrderSummaryProps = {
  subtotal?: string;
  serviceFee?: string;
  tax?: string;
  total?: string;
  onContinueShopping: () => void;
  onCheckout: () => void
};

const OrderSummary = ({
  subtotal,
  serviceFee,
  tax,
  total,
  onContinueShopping,
  onCheckout
}: OrderSummaryProps) => {
  

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.breakdown}>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <div className={styles.row}>
          <span>Service Fee</span>
          <span>${serviceFee}</span>
        </div>

        <div className={styles.row}>
          <span>Estimated Tax</span>
          <span>${tax}</span>
        </div>
      </div>

      <div className={styles.totalRow}>
        <span>Total</span>
        <span>${total}</span>
      </div>

      <button type="button" className={styles.checkoutButton} onClick={onCheckout}>
        <span>Proceed to Checkout</span>
        <ArrowRight size={17} />
      </button>

      <button
        type="button"
        className={styles.continueButton}
        onClick={onContinueShopping}
      >
        Continue Shopping
      </button>
    </section>
  );
};

export default OrderSummary;
