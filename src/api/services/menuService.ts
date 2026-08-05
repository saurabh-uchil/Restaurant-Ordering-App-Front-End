import { api } from "../api";

export const addMenuItem = async (restaurant_Id: string, data: any) => {
  const response = await api.post(`food-items/addItem`, {...data, restaurant_Id});
  return response.data;
};

export const getMenuItemById = async (menuItemId: string) => {
  const response = await api.get(`/menu/food-item/${menuItemId}`);
  return response.data;
}

export const getMenuItems = async (restaurantId: string) => {
  const response = await api.get(`/menu/${restaurantId}`);
  return response.data;
}

export const editMenuItem = async (itemId:string, data: any) => {
  const response = await api.put(`/menu/update-food-item/${itemId}`, data);
  return response.data;
};

export const deleteMenuItem = async (itemId: string) => {
  const response = await api.delete(`menu/delete-food-item/${itemId}`);
  return response.data;
};



