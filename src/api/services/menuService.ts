import { api } from "../api";

export const addMenuItem = async (restaurantId: string, data: any) => {
  const response = await api.post(`/menu/${restaurantId}`, data);
  return response.data;
};