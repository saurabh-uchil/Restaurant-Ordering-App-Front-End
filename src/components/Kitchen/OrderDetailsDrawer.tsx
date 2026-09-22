import { Drawer } from "@mui/material";
import { X } from "lucide-react";
import type { OrderDetailsDrawerProps } from "../../types/OrderSummary";


const OrderDetailsDrawer = ({ order, onClose }: OrderDetailsDrawerProps) => {
  return (
    <Drawer anchor="right" open={!!order} onClose={onClose}>
      <div>
        <button onClick={onClose}>
          <X />
        </button>

        {order && (
          <div>
            <h2>Order #{order.orderNumber}</h2>

            <p>Table {order.table}</p>

            <div>
              {order.items.map((item, index) => (
                <div key={`${item.itemId}-${index}`}>
                  <p>
                    {item.quantity} × {item.name}
                  </p>
                </div>
              ))}
            </div>

            <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default OrderDetailsDrawer;