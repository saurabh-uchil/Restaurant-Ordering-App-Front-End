
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, editOrderStatus, getActiveOrdersByRestaurantId, getOrderById, getOrdersByRestaurantId } from "../services/orderService";

type SelectedItem = {
  name: string;
  extraCost: number;
};

export type OrderItem = {
  name: string;
  itemId: string;
  basePrice: number;
  specialInstructions?: string;
  quantity: number;
  addons: SelectedItem[];
  dietaryAlternatives: SelectedItem[];
  removableIngredients: string[];
  options: Record<string, SelectedItem>;
}

type CreateOrderProps = {
    items: OrderItem[];
    table: string | null;
    restaurantId: string;
}

export const useOrder = () => {
   return useMutation({
        mutationFn: ({items, table, restaurantId}: CreateOrderProps) => createOrder(items, table, restaurantId)
    });
}

export const useGetOrderById = (orderId: string) =>{
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: ()=> getOrderById(orderId)
  })
}

export const useGetOrdersByRestaurantId = (restaurantId: string) =>{
  return useQuery({
    queryKey: ["orders", restaurantId],
    queryFn: ()=> getOrdersByRestaurantId(restaurantId)
  })
}

export const useGetActiveOrdersByRestaurantId = (restaurantId: string) =>{
  return useQuery({
    queryKey: ["activeOrders", restaurantId],
    queryFn: ()=> getActiveOrdersByRestaurantId(restaurantId),
    enabled: !!restaurantId
  })
}

export const useEditOrderStatus = () =>{
  return useMutation({
    mutationFn: async ({orderId, newStatus}: {orderId: string, newStatus: string}) => {
      return editOrderStatus(orderId, newStatus);
    }
  });
}
