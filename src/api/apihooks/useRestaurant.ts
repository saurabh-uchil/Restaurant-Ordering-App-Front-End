import { useQuery } from "@tanstack/react-query";
import { getRestaurant } from "../services/restaurantService";

export const useRestuarant = (slug:string) =>{
    return  useQuery({
        queryKey:['restaurant'],
        queryFn: ()=> getRestaurant(slug),
    });
}