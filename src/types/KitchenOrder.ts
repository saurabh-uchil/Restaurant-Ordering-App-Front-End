export type KitchenOrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "completed";

export type KitchenOrderPaymentStatus =
  | "pending"
  | "paid"
  | "failed";

export type KitchenOrderAddon = {
  name: string;
  extraCost: number;
};

export type KitchenOrderDietaryAlternative = {
  name: string;
  extraCost: number;
};

export type KitchenOrderOption = {
  name: string | null;
  extraCost: number;
};

export type KitchenOrderItem = {
  itemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  specialInstructions: string;
  addons: KitchenOrderAddon[];
  dietaryAlternatives: KitchenOrderDietaryAlternative[];
  removableIngredients: string[];
  options: Record<string, KitchenOrderOption>;
};

export type KitchenOrder = {
  _id: string;
  table: number;
  restaurantId: string;
  status: KitchenOrderStatus;
  paymentStatus: KitchenOrderPaymentStatus;
  orderNumber: number;
  items: KitchenOrderItem[];
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type OrderFilters = {
  orderNumber: string;
  date: string;
  total: string;
  table: string;
};

export type OrderFiltersProps = {
  filters: OrderFilters;
  setFilters: React.Dispatch<React.SetStateAction<OrderFilters>>;
  tableOptions: FilterOption[];
};

type FilterOption = {
  label: string;
  value: string;
};

export type FilterDropdownProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};
