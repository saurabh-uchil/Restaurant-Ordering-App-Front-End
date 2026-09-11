import { ArrowRight, Loader2 } from "lucide-react";
import { orderSummaryStyles as styles } from "../../../styles/cart";
import type { OrderSummaryProps } from "../../../types/OrderSummary";

const OrderSummary = ({
  subtotal,
  serviceFee,
  tax,
  total,
  onContinueShopping,
  onConfirmOrder,
  isPending,
  isError,
  error,
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

      {/* <button
        type="button"
        className={styles.checkoutButton}
        onClick={() => alert("Handle Checkout")}
      >
        <span>Proceed to Checkout</span>
        <ArrowRight size={17} />
      </button> */}

      <button
        type="button"
        className={styles.checkoutButton}
        onClick={onConfirmOrder}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            <span>Placing Order...</span>
          </>
        ) : (
          <>
            <span>Confirm Order</span>
            <ArrowRight size={17} />
          </>
        )}
      </button>

      {isError && (
        <p className={styles.errorMessage}>
          {error?.message ?? "Unable to place your order. Please try again."}
        </p>
      )}

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
