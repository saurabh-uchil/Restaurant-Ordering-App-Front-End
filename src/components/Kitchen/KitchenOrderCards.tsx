import { ArrowRight } from "lucide-react";

import { kitchenOrderCardStyles as styles } from "../../styles/Kitchen/KitchenOrderCard";
import type { KitchenOrder } from "../../types/KitchenOrder";

export type KitchenOrderStatus = "received" | "preparing" | "ready";

type KitchenOrderCardProps = {
  order: KitchenOrder;
  onStatusChange: (orderId: string, status: KitchenOrderStatus) => void;
};

const KitchenOrderCard = ({ order, onStatusChange }: KitchenOrderCardProps) => {
  const getAction = () => {
    switch (order.status) {
      case "received":
        return {
          label: "Start Preparing",
          nextStatus: "preparing" as const,
        };

      case "preparing":
        return {
          label: "Mark Ready",
          nextStatus: "ready" as const,
        };

      case "ready":
        return {
          label: "Complete",
          nextStatus: "ready" as const,
        };
    }
  };

  const action = getAction();

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.orderNumber}>#{order.orderNumber}</p>

          <p className={styles.table}>Table {order.table}</p>
        </div>

        <span className={styles.status}>{order.status}</span>
      </div>

      <div className={styles.items}>
        {order.items.map((item, index) => (
          <div key={`${item.name}-${index}`} className={styles.item}>
            <span className={styles.quantity}>{item.quantity} ×</span>

            <span className={styles.itemName}>{item.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p className={styles.total}>${order.total.toFixed(2)}</p>

        <button
          type="button"
          className={styles.actionButton}
          onClick={() => onStatusChange(order._id, action.nextStatus)}
        >
          {action.label}

          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default KitchenOrderCard;
