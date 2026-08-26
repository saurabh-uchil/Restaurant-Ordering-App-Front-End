import { api } from "../api";
import type { OrderItem } from "../apihooks/useOrder";

export const createOrder = async (cart: OrderItem[], table:string | null, restaurantId:string) =>{
    const response = await api.post('/orders', {cart, table, restaurantId});
    return response.data;
}

export const getOrderById = async(orderId: string)=>{
    const response =  await api.get(`/orders/${orderId}`);
    return response.data;
}