export type KitchenOrderStatus =
  | "new"
  | "preparing"
  | "ready";

export type KitchenOrderItem = {
  name: string;
  quantity: number;
};

export type KitchenOrder = {
  id: string;
  orderNumber: number;
  table: number;
  status: KitchenOrderStatus;
  items: KitchenOrderItem[];
  subtotal: number;
  total: number;
};