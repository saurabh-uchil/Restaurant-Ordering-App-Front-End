import { Drawer } from "@mui/material";
import { X } from "lucide-react";
import { orderHistoryDrawerStyles as styles } from "../../styles/CustomerPage/orderHistoryDrawer";

export type SessionOrder = {
  _id: string;
  orderNumber: number;
  status: string;
  total: number;
  items: { name: string; quantity: number }[];
  createdAt?: string;
};

type OrderHistoryDrawerProps = {
  open: boolean;
  orders: SessionOrder[];
  onClose: () => void;
};

const statusStyles: Record<string, string> = {
  received: styles.statusReceived,
  preparing: styles.statusPreparing,
  ready: styles.statusReady,
  completed: styles.statusCompleted,
  cancelled: styles.statusCancelled,
};

const OrderHistoryDrawer = ({ open, orders, onClose }: OrderHistoryDrawerProps) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    slotProps={{ paper: { className: styles.paper } }}
    aria-labelledby="session-orders-title"
  >
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h2 id="session-orders-title" className={styles.title}>Orders at this table</h2>
          <p className={styles.description}>Orders placed by everyone sharing this table session.</p>
        </div>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close order history">
          <X size={20} />
        </button>
      </header>

      {orders.length === 0 ? (
        <p className={styles.emptyState}>No orders have been placed at this table yet.</p>
      ) : (
        <ul className={styles.ordersList}>
          {orders.map((order) => (
            <li key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <h3 className={styles.orderNumber}>Order #{order.orderNumber}</h3>
                  {order.createdAt && !Number.isNaN(Date.parse(order.createdAt)) && (
                    <time className={styles.orderTime} dateTime={order.createdAt}>
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </time>
                  )}
                </div>
                <span className={`${styles.statusBadge} ${statusStyles[order.status] ?? styles.statusCompleted}`}>
                  {order.status}
                </span>
              </div>

              <ul className={styles.itemsList}>
                {order.items.map((item, index) => (
                  <li key={`${item.name}-${index}`} className={styles.itemRow}>
                    <span>{item.quantity} × {item.name}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.totalRow}>
                <span>Order total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Drawer>
);

export default OrderHistoryDrawer;
