import { ArrowRight } from "lucide-react";
import { orderSummaryStyles as styles } from "../../../styles/cart";

type OrderSummaryProps = {
  subtotal?: number;
  serviceFee?: number;
  tax?: number;
  total?: number;
  onContinueShopping: ()=>void;
};

const OrderSummary = ({
  subtotal = 0,
  serviceFee = 0,
  tax = 0,
  total = 0,
  onContinueShopping
}: OrderSummaryProps) => {

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.breakdown}>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.row}>
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>

        <div className={styles.row}>
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className={styles.totalRow}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button type="button" className={styles.checkoutButton}>
        <span>Proceed to Checkout</span>
        <ArrowRight size={17} />
      </button>

      <button type="button" className={styles.continueButton} onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </section>
  );
};

export default OrderSummary;