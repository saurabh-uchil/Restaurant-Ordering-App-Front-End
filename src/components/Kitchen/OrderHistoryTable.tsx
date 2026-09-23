import { Eye } from "lucide-react";
import { orderHistoryStyles as OrderHistoryStyles } from "../../styles/Kitchen/OrderHistory";
import type { KitchenOrder } from "../../types/KitchenOrder";

type OrderHistoryTableProps = {
  orders: KitchenOrder[];
  selectOrder: (order: KitchenOrder) => void;
};

const OrderHistoryTable = ({ orders, selectOrder }: OrderHistoryTableProps) => {
  return (
    <div className={OrderHistoryStyles.tableWrapper}>
      <table className={OrderHistoryStyles.table}>
        <thead>
          <tr className={OrderHistoryStyles.tableHeader}>
            <th className={OrderHistoryStyles.headerCell}>Order #</th>
            <th className={OrderHistoryStyles.headerCell}>Table</th>
            <th className={OrderHistoryStyles.headerCell}>Items</th>
            <th className={OrderHistoryStyles.headerCell}>Completed At</th>
            <th className={OrderHistoryStyles.headerCell}>Total</th>
            <th className={OrderHistoryStyles.headerCell}></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className={`${OrderHistoryStyles.tableRow} group`}
            >
              <td className={OrderHistoryStyles.orderNumber}>
                #{order.orderNumber}
              </td>

              <td className={OrderHistoryStyles.tableCell}>
                Table {order.table}
              </td>

              <td className={OrderHistoryStyles.tableCell}>
                <div className={OrderHistoryStyles.items}>
                  {order.items.map((item, index) => (
                    <p key={`${item.itemId}-${index}`}>
                      {item.quantity} × {item.name}
                    </p>
                  ))}
                </div>
              </td>

              <td className={OrderHistoryStyles.tableCell}>
                {new Date(order.updatedAt).toLocaleString()}
              </td>

              <td className={OrderHistoryStyles.total}>
                ${order.total.toFixed(2)}
              </td>

              <td className={OrderHistoryStyles.actionCell}>
                <button
                  type="button"
                  onClick={() => selectOrder(order)}
                  className={OrderHistoryStyles.viewButton}
                  aria-label={`View order ${order.orderNumber}`}
                >
                  <Eye size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
