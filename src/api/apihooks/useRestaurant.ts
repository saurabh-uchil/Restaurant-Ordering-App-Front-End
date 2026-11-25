import { useQuery } from "@tanstack/react-query";
import { getMenu, getRestaurant, getRestaurantStats } from "../services/restaurantService";

export const useRestuarant = (slug:string) =>{
    return  useQuery({
        queryKey:['restaurant'],
        queryFn: ()=> getRestaurant(slug),
    });
}

export const useGetMenu = (slug:string)=>{
    return  useQuery({
        queryKey:['menu'],
        queryFn: ()=> getMenu(slug),
    });
}

export const useGetRestaurantStats = (restaurantId:string)=>{
    return  useQuery({
        queryKey:['restaurantStats'],   
        queryFn: ()=> getRestaurantStats(restaurantId),
    });
}