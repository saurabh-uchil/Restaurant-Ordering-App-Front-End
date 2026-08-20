import { create } from "zustand";

export type CartItem = {
    name: string,
    itemId: string,
    cartItemId:string,
    imageUrl: string
    basePrice: number,
    extraCost?: number, 
    specialInstructions?: string,
    quantity: number;
    addons: string[];
    dietaryAlternatives: string[];
    removableIngredients: string[];
    options: Record<string, string>;
}

type cartState = {
    myCart: CartItem[],
    addToCart: (item:CartItem) => void
}

export const useCart = create<cartState>((set) => ({
    myCart: [],
    addToCart: (item: CartItem) => set((state) => ({ myCart: [...state.myCart, item] }))
}));