import { create } from "zustand";

type cartItem = {
    name: string,
    itemId: string,
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
    myCart: cartItem[],
    addToCart: (item:cartItem) => void
}

export const useCart = create<cartState>((set) => ({
    myCart: [],
    addToCart: (item: cartItem) => set((state) => ({ myCart: [...state.myCart, item] }))
}));