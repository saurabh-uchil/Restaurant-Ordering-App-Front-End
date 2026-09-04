import { api } from "../api";
import type { OrderItem } from "../apihooks/useOrder";

export const createOrder = async (items: OrderItem[], table:string | null, restaurantId:string) =>{
    const response = await api.post('/orders', {items, table, restaurantId});
    return response.data;
}

export const getOrderById = async(orderId: string)=>{
    const response =  await api.get(`/orders/${orderId}`);
    return response.data;
}

export const getOrdersByRestaurantId = async(restaurantId: string)=>{
    const response = await api.get(`/orders/restaurant/${restaurantId}`);
    return response.data;
}

export const getActiveOrdersByRestaurantId = async(restaurantId: string)=>{
    const response = await api.get(`/orders/restaurant/${restaurantId}/active`);
    return response.data;
}

export const editOrderStatus = async(orderId: string, newStatus: string)=>{
    console.log("Editing order status:", orderId, newStatus);
    const response = await api.patch(`/orders/${orderId}/status`, {newStatus});
    return response.data;
}