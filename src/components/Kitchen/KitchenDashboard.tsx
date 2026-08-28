import { useParams } from "react-router";
import { useRestuarant } from "../../api/apihooks/useRestaurant";

const KitchenDashboard = () => {
    const { restaurant } = useParams<{ restaurant: string }>();
    const restaurantSlugName = restaurant ?? "";

    const {data, isPending, isError, error} = useRestuarant(restaurantSlugName);
  return (
    <div>
        {data && data?.name}
        <h4> This is the Kitchen Dashboard</h4>
    </div>
  )
}

export default KitchenDashboard