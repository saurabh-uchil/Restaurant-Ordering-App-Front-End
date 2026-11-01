
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { checkActiveSession, createOrder, createSession, editOrderStatus, getActiveOrdersByRestaurantId, getCompletedOrdersByRestaurantId, getOrderById, getOrdersByRestaurantId, getOrdersForCurrentSession, joinSession, validateSession } from "../services/orderService";

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
}

export const useOrder = () => {
   const queryClient = useQueryClient();
   return useMutation({
        mutationFn: ({items}: CreateOrderProps) => createOrder(items),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session-orders"] }),
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({restaurantId, table}: {restaurantId: string, table: string}) => {
      return createSession(restaurantId, table);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] }),
  });
}

export const useValidateSession = () =>{
  return useQuery({
      queryKey: ["session"],
      queryFn: ()=> validateSession(),
      // Several customer views observe this same session query. Keep the
      // successful result fresh across route transitions so mounting the
      // header does not immediately trigger another validation request.
      staleTime: 30_000,
      retry: (failureCount, error) =>
        !(axios.isAxiosError(error) && error.response?.status === 401) && failureCount < 2,
    })
}

export const useCheckActiveSession = (
  restaurantId: string,
  table: string,
  enabled: boolean,
) => useQuery({
  queryKey: ["active-session", restaurantId, table],
  queryFn: () => checkActiveSession(restaurantId, table),
  enabled: enabled && Boolean(restaurantId) && Boolean(table),
  retry: 1,
});

export const useJoinSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, table }: { restaurantId: string; table: string }) =>
      joinSession(restaurantId, table),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] }),
  });
};

export const useGetOrdersForCurrentSession = (enabled: boolean, sessionId?: string) => useQuery({
  queryKey: ["session-orders", sessionId],
  queryFn: getOrdersForCurrentSession,
  enabled: enabled && Boolean(sessionId),
  refetchInterval: 10000,
});

