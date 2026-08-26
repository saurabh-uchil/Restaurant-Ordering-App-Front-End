
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, getOrderById } from "../services/orderService";

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
    cart: OrderItem[];
    table: string | null;
    restaurantId: string;
}

export const useOrder = () => {
   return useMutation({
        mutationFn: ({cart, table, restaurantId}: CreateOrderProps) => createOrder(cart, table, restaurantId)
    });
}

export const useGetOrderById = (orderId: string) =>{
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: ()=> getOrderById(orderId)
  })
}
