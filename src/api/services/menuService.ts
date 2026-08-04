import { api } from "../api";

export const addMenuItem = async (restaurant_Id: string, data: any) => {
  const response = await api.post(`food-items/addItem`, {...data, restaurant_Id});
  return response.data;
};

export const getMenuItems = async (restaurantId: string) => {
  const response = await api.get(`/menu/${restaurantId}`);
  return response.data;
}

export const editMenuItem = async (restaurantId: string, data: any) => {
  const response = await api.put(`/menu/${restaurantId}`, data);
  return response.data;
};

export const deleteMenuItem = async (restaurantId: string, menuItemId: string) => {
  const response = await api.delete(`/menu/${restaurantId}/${menuItemId}`);
  return response.data;
};



