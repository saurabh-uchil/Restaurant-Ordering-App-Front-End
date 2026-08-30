import type { KitchenOrder } from "../types/KitchenOrder";


export const mockOrders: KitchenOrder[] = [
  {
    id: "order-1001",
    orderNumber: 1042,
    table: 5,
    status: "new",
    items: [
      {
        name: "Chicken Burger",
        quantity: 2,
      },
      {
        name: "French Fries",
        quantity: 1,
      },
      {
        name: "Coke",
        quantity: 2,
      },
    ],
    subtotal: 32.5,
    total: 35.1,
  },

  {
    id: "order-1002",
    orderNumber: 1043,
    table: 2,
    status: "new",
    items: [
      {
        name: "Margherita Pizza",
        quantity: 1,
      },
      {
        name: "Garlic Bread",
        quantity: 1,
      },
    ],
    subtotal: 21.0,
    total: 22.68,
  },

  {
    id: "order-1003",
    orderNumber: 1044,
    table: 8,
    status: "new",
    items: [
      {
        name: "Pasta Alfredo",
        quantity: 2,
      },
      {
        name: "Iced Tea",
        quantity: 2,
      },
    ],
    subtotal: 28.0,
    total: 30.24,
  },

  {
    id: "order-1004",
    orderNumber: 1045,
    table: 3,
    status: "preparing",
    items: [
      {
        name: "Beef Burger",
        quantity: 1,
      },
      {
        name: "French Fries",
        quantity: 1,
      },
    ],
    subtotal: 18.5,
    total: 19.98,
  },

  {
    id: "order-1005",
    orderNumber: 1046,
    table: 7,
    status: "preparing",
    items: [
      {
        name: "Chicken Tikka",
        quantity: 2,
      },
      {
        name: "Naan",
        quantity: 3,
      },
      {
        name: "Mango Lassi",
        quantity: 2,
      },
    ],
    subtotal: 34.0,
    total: 36.72,
  },

  {
    id: "order-1006",
    orderNumber: 1047,
    table: 1,
    status: "ready",
    items: [
      {
        name: "Fish and Chips",
        quantity: 1,
      },
      {
        name: "Coke",
        quantity: 1,
      },
    ],
    subtotal: 17.5,
    total: 18.9,
  },
];