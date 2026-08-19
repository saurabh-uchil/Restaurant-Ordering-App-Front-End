import { useNavigate, useParams, useSearchParams } from "react-router";
import { useRestuarant } from "../../../api/apihooks/useRestaurant";
import { ContentState } from "../../ContentState";
import CustomerHeader from "../CustomerHeader";
import CartItems from "../Cart/CartItems";
import { cartStyles as styles } from "../../../styles/cart";
import CartInfo from "../Cart/CartInfo";
import { useCart } from "../../../store/cartStore";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";
import CartNotices from "./CartNotices";

const Cart = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const myCart = useCart((state) => state.myCart);

  const {
    data: restaurantDetails,
    isPending: isRestaurantPending,
    isError: isRestaurantError,
    error: restaurantError,
  } = useRestuarant(restaurantSlugName);

  // Validate URL
  if (!restaurantSlugName || !table) {
    return (
      <ContentState
        type="error"
        title="Invalid restaurant link"
        description="Please scan the QR code at your table again."
      />
    );
  }

  // Loading
  if (isRestaurantPending) {
    return (
      <ContentState
        type="loading"
        title="Loading cart..."
        description="Getting everything ready for you."
      />
    );
  }

  // Restaurant request failed
  if (isRestaurantError) {
    return (
      <ContentState
        type="error"
        title="Unable to load restaurant"
        description={
          restaurantError?.message ||
          "Something went wrong while loading the restaurant."
        }
      />
    );
  }

  // No restaurant
  if (!restaurantDetails) {
    return (
      <ContentState
        type="empty"
        title="Restaurant not found"
        description="This restaurant may no longer be available."
      />
    );
  }

  const hasItems = myCart.length;

  return (
    <div className={styles.page}>
      <CustomerHeader
          restaurant={restaurantDetails.name}
          slug={restaurantSlugName}
          table={table}
        />

      <div className={styles.container}>
        {!hasItems ? (
          <EmptyCart
            onBrowseMenu={() =>
              navigate(`/restaurant/${restaurantSlugName}/menu?table=${table}`)
            }
          />
        ) : (
          <div className={styles.cartLayout}>
            <main className={styles.itemsColumn}>
              <CartInfo table={table} />
              <CartItems />
            </main>

            <aside className={styles.summaryColumn}>
              <OrderSummary  
              onContinueShopping={() =>
              navigate(`/restaurant/${restaurantSlugName}/menu?table=${table}`)
            }/>
              <CartNotices />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
