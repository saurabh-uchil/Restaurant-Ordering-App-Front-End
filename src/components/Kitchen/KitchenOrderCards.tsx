import { ArrowRight, Loader2 } from "lucide-react";

import { kitchenOrderCardStyles as styles } from "../../styles/Kitchen/KitchenOrderCard";
import type {
  KitchenOrder,
  KitchenOrderStatus,
} from "../../types/KitchenOrder";

type KitchenOrderCardProps = {
  order: KitchenOrder;
  onStatusChange: (orderId: string, status: KitchenOrderStatus) => void;
  isUpdating?: boolean;
  updateError?: string | null;
};

const KitchenOrderCard = ({
  order,
  onStatusChange,
  isUpdating,
  updateError,
}: KitchenOrderCardProps) => {
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
          nextStatus: "completed" as const,
        };

      case "completed":
        return null;
    }
  };

  const action = getAction();

  if (!action) {
    return null;
  }

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
        <div className={styles.footerMain}>
          <p className={styles.total}>${order.total.toFixed(2)}</p>

          <button
            type="button"
            className={styles.actionButton}
            disabled={isUpdating}
            onClick={() => onStatusChange(order._id, action.nextStatus)}
          >
            {isUpdating ? (
              <Loader2 size={16} className={styles.loader} />
            ) : (
              <>
                {action.label}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {updateError && <p className={styles.updateError}>{updateError}</p>}
      </div>
    </article>
  );
};

export default KitchenOrderCard;
