import {orderStatusCardStyles as styles} from "../../styles/Kitchen/OrderStatusCard";

type OrderStatusCardProps = {
  status: "New Orders" | "Preparing" | "Ready";
  stats: number;
};

const OrderStatusCard = ({
  status,
  stats,
}: OrderStatusCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.statusContainer}>
        <span className={styles.statusDot} />

        <p className={styles.status}>
          {status}
        </p>
      </div>

      <p className={styles.stats}>
        {stats}
      </p>
    </div>
  );
};

export default OrderStatusCard;