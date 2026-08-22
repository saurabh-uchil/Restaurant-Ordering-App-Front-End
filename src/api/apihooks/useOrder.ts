
import { useMutation } from "@tanstack/react-query";
import type { CartItem } from "../../store/cartStore";
import { createOrder } from "../services/orderService";

type CreateOrderProps = {
    items: CartItem[];
    table: number
}

export const useOrder = () => {
   return useMutation({
        mutationFn: ({items, table}: CreateOrderProps) => createOrder(items, table)
    });
}