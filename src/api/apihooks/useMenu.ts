/* eslint-disable react-hooks/rules-of-hooks */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMenuItem, deleteMenuItem, editMenuItem } from "../services/menuService";
import { getMenuItemById } from "../services/menuService";

type AddItemParams = {
    restaurantId: string;
    data: any;
};

//Get Item By Id
export const useGetItemById = (id?: string) => {
    return useQuery({
        queryKey: ["menuItem", id],
        queryFn: () => getMenuItemById(id!),
        enabled: !!id, 
    });
}

//Add Item
export const useAddItem = () => {
    return useMutation({
        mutationFn: ({restaurantId, data}: AddItemParams) => addMenuItem(restaurantId, data),
    });
}

//Edit Item
export const useEditFoodItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, item}: { id: string; item: any }) => editMenuItem(id, item),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["menuItem", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["menuItems", variables.item.restaurant_Id],
            });
        }
    })
}

//Delete Item
export const useDeleteFoodItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) => deleteMenuItem(itemId),
        onSuccess: (data, itemId) => {
            // Invalidate the query for the deleted item
            queryClient.invalidateQueries({
                queryKey: ["menuItem", itemId],
            });

            queryClient.invalidateQueries({
                queryKey: ["menu"],
            });
        }
    });
}