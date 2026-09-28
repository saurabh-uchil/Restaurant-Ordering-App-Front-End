import type { KitchenOrder, OrderFilters } from "../types/KitchenOrder";

export const isOrderInDateFilter = (
  orderDateString: string,
  dateFilter: string
) => {
  const orderDate = new Date(orderDateString);
  const today = new Date();

  if (dateFilter === "today") {
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }

  if (dateFilter === "yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (
      orderDate.getDate() === yesterday.getDate() &&
      orderDate.getMonth() === yesterday.getMonth() &&
      orderDate.getFullYear() === yesterday.getFullYear()
    );
  }

  if (dateFilter === "last7Days") {
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return orderDate >= sevenDaysAgo && orderDate <= today;
  }

  if (dateFilter === "last30Days") {
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    return orderDate >= thirtyDaysAgo && orderDate <= today;
  }

  return true;
};

export const isOrderInTotalFilter = (
  total: number,
  totalFilter: string
) => {
  if (totalFilter === "under20") {
    return total < 20;
  }

  if (totalFilter === "20to50") {
    return total >= 20 && total <= 50;
  }

  if (totalFilter === "50to100") {
    return total > 50 && total <= 100;
  }

  if (totalFilter === "over100") {
    return total > 100;
  }

  return true;
};

export const isOrderInTableFilter = (
  table: number,
  tableFilter: string
) => {
  if (!tableFilter) {
    return true;
  }

  return table.toString() === tableFilter;
};

export const filterOrders = (orders: KitchenOrder[], filters: OrderFilters) => {
  return orders.filter((order) => {
    if (
      filters.orderNumber &&
      !order.orderNumber.toString().includes(filters.orderNumber)
    ) {
      return false;
    }

    if (
      filters.date &&
      !isOrderInDateFilter(order.updatedAt, filters.date)
    ) {
      return false;
    }

    if (
      filters.total &&
      !isOrderInTotalFilter(order.total, filters.total)
    ) {
      return false;
    }

    if (
      filters.table &&
      !isOrderInTableFilter(order.table, filters.table)
    ) {
      return false;
    }

    return true;
  });
};