import { useParams, useSearchParams } from "react-router";
import { useGetMenu } from "../api/apihooks/useRestaurant";

const CustomerMenuPage = () => {

  const {restaurant} = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";
  const [searchParams] = useSearchParams();

  const table = searchParams.get('table');

  const { data, isPending, isError, error, } = useGetMenu(restaurantSlugName);

  console.log(data);

  return (
    <div>
      <h4>Customer Menu Page</h4>
      <p>Restaurant: {restaurant}</p>
      <p>Table: {table}</p>
    </div>

  )
}

export default CustomerMenuPage