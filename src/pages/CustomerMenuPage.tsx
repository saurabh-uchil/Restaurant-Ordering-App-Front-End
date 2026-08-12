import { useParams, useSearchParams } from "react-router";
import { useGetMenu, useRestuarant } from "../api/apihooks/useRestaurant";
import CustomerHeader from "../components/CustomerPage/CustomerHeader";
import {customerHeaderStyles as styles} from "../styles/CustomerPage/customerPage";

const CustomerMenuPage = () => {

  const {restaurant} = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";
  const [searchParams] = useSearchParams();

  const table = searchParams.get('table');

  const { data, isPending, isError, error, } = useGetMenu(restaurantSlugName);

   const { data: restaurantDetails, isPending: fetchingRestaurant, isError: restaurantHasError, error: restaurantError } = useRestuarant(restaurantSlugName);

  console.log(restaurantDetails);

  return (
  <div className={styles.page}>
    <div className={styles.container}>
      {data && <CustomerHeader
        restaurant={restaurantDetails.name}
        table={table}
      />}

      {/* rest of customer menu */}
    </div>
  </div>
);
}

export default CustomerMenuPage