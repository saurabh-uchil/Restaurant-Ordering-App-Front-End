import type { CartItem } from "../store/cartStore";

export const normaliseCartData = (cartData: CartItem[], table: string | null , restaurantId: string) =>{
    const items = cartData.map((item: CartItem)=>({itemId: item.itemId, name:item.name, basePrice: item.basePrice, quantity: item.quantity, specialInstructions: item.specialInstructions,
        addons: item.addons, dietaryAlternatives: item.dietaryAlternatives, removableIngredients: item.removableIngredients, options: item.options}));
        return {items, table, restaurantId}
}