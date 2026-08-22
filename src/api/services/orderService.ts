import type { CartItem } from "../../store/cartStore";
import { api } from "../api";

export const createOrder = async (items: CartItem[], table:number) =>{
    const response = await api.post('/orders', {items, table});
    return response.data;
}