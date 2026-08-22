/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

export type CartItem = {
  name: string;
  itemId: string;
  cartItemId: string;
  imageUrl: string;
  basePrice: number;
  extraCost?: number;
  specialInstructions?: string;
  quantity: number;
  addons: string[];
  dietaryAlternatives: string[];
  removableIngredients: string[];
  options: Record<string, string>;
};

type cartState = {
  myCart: CartItem[];
  addToCart: (item: CartItem) => void;
  editCartItem: (item: CartItem) => void;
  deleteCartItem: (cartItem: CartItem) => void;
};

export const useCart = create<cartState>((set) => ({
  myCart: [],

  addToCart: (item: CartItem) =>
    set((state) => ({ myCart: [...state.myCart, item] })),

  editCartItem: (updatedItem: CartItem) =>
    set((state) => {
        console.log(updatedItem);
        return {
            myCart: state.myCart.map((item) =>
            item.cartItemId === updatedItem.cartItemId ? updatedItem : item)
        }
    }),

  deleteCartItem: (cartItem: CartItem) => 
    set((state)=> ({myCart: state.myCart.filter((item)=> item.cartItemId !== cartItem.cartItemId)}))  
}));
