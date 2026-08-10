import { useQuery } from "@tanstack/react-query";
import { getMenu, getRestaurant } from "../services/restaurantService";

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