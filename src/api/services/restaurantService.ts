import { api } from "../api";

export const getRestaurant = async (slug: string) =>{
    const response = await api.get(`/restaurant/slug/${slug}`);
    return response.data;
}

export const getMenu = async (slug: string) =>{
    const response = await api.get(`/restaurant/menu/${slug}`);
    return response.data;
}

export const getRestaurantStats = async (restaurantId: string) =>{
    const response = await api.get(`/restaurant/stats/${restaurantId}`);
    return response.data;
}
