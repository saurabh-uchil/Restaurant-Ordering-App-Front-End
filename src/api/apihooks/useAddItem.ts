/* eslint-disable react-hooks/rules-of-hooks */

import { useMutation } from "@tanstack/react-query";
import { addMenuItem } from "../services/menuService";

type AddItemParams = {
    restaurantId: string;
    data: any;
};

export const useAddItem = () => {
    return useMutation({
        mutationFn: ({restaurantId, data}: AddItemParams) => addMenuItem(restaurantId, data),
    });
}