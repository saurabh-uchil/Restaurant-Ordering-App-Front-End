
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, createSession, editOrderStatus, getActiveOrdersByRestaurantId, getCompletedOrdersByRestaurantId, getOrderById, getOrdersByRestaurantId, validateSession } from "../services/orderService";

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

export const useGetCompletedOrdersByRestaurantId = (restaurantId: string) =>{
  return useQuery({
    queryKey: ["completedOrders", restaurantId],
    queryFn: ()=> getCompletedOrdersByRestaurantId(restaurantId),
    enabled: !!restaurantId
  })
}

export const useCreateSession = () =>{
  return useMutation({
    mutationFn: async ({restaurantId, table}: {restaurantId: string, table: string}) => {
      return createSession(restaurantId, table);
    }
  });
}

export const useValidateSession = () =>{
  return useQuery({
      queryKey: ["session"],
      queryFn: ()=> validateSession()
    })
}
