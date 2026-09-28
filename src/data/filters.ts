import type { KitchenOrder} from "../types/KitchenOrder";

export const filters = [
  "All",
  "Entree",
  "Mains",
  "Dessert",
  "Kids",
  "Sides",
  "Steaks",
];

export const dateOptions = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "last7Days" },
  { label: "Last 30 days", value: "last30Days" },
];

export const totalOptions = [
  { label: "Under $20", value: "under20" },
  { label: "$20 - $50", value: "20to50" },
  { label: "$50 - $100", value: "50to100" },
  { label: "$100+", value: "over100" },
];

export const getTableOptions = (orders: KitchenOrder[]) => {

 return Array.from(
  new Set(orders.map((order) => order.table))
).map((table) => ({
  label: `Table ${table}`,
  value: table.toString(),
}));
}
