export type KitchenOrderStatus =
  | "received"
  | "preparing"
  | "ready";

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
  options: {
    "Sauce For Gnocchi": KitchenOrderOption;
    "Spice Level": KitchenOrderOption;
  };
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
