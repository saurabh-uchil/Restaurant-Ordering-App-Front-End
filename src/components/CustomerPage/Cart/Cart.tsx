import { Navigate, useNavigate, useParams, useSearchParams } from "react-router";
import { useRestuarant } from "../../../api/apihooks/useRestaurant";
import { ContentState } from "../../ContentState";
import CustomerHeader from "../CustomerHeader";
import CartItems from "../Cart/CartItems";
import { cartStyles as styles } from "../../../styles/cart";
import CartInfo from "../Cart/CartInfo";
import { useCart, type CartItem } from "../../../store/cartStore";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";
import CartNotices from "./CartNotices";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ItemCustomizer from "../ItemCustomizer";
import { useGetItemById } from "../../../api/apihooks/useMenu";
import Notification from "../../Notification";
import FeedbackState from "../../FeedbackState";
import { getCartTotal } from "../../../services/calculateCostService";
import { serviceCharge, taxCharge } from "../../../data/serviceCharges";
import { useOrder, useValidateSession } from "../../../api/apihooks/useOrder";
import { normaliseCartData } from "../../../services/structureCartData";
import axios from "axios";
import { useTimedNotification } from "../../../hooks/useTimedNotification";

const Cart = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");
  const {
    data: sessionValidation,
    isPending: isSessionPending,
    isFetching: isSessionFetching,
    isError: isSessionError,
    error: sessionError,
  } = useValidateSession();

  const myCart = useCart((state) => state.myCart);
  const deleteCartItem = useCart((state) => state.deleteCartItem);
  const clearCart = useCart((state) => state.clearCart);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { notification, showNotification, dismissNotification } = useTimedNotification();

  const handleShowToast = (
    itemName: string,
    variant: "success" | "error" | "warning" | "info" = "success",
  ) => {
    showNotification({
      variant,
      message: variant === "error"
        ? `${itemName} removed from the cart`
        : `${itemName} updated successfully`,
    });
  };

  const {
    data: menuItem,
    isPending: isFetching,
    isError: isFetchError,
    error: fetchError,
  } = useGetItemById(selectedItem?.itemId);

  const handleDrawer = () => {
    setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen);
  };

  const handleEdit = (item: CartItem) => {
    setSelectedItem(item);
    handleDrawer();
  };

  const handleDelete = (cartItem: CartItem) => {
    deleteCartItem(cartItem);
    handleShowToast(cartItem.name, "error");
  };

  const {
    data: restaurantDetails,
    isPending: isRestaurantPending,
    isError: isRestaurantError,
    error: restaurantError,
  } = useRestuarant(restaurantSlugName);

  const { mutateAsync, isPending, isError, error } = useOrder();

  const hasItems = myCart.length;
  const cartTotal = getCartTotal(myCart);

  const serviceFee = serviceCharge;
  const tax = taxCharge;

  const serviceFeeAmt = (cartTotal * (serviceFee / 100)).toFixed(2);
  const taxAmt = (cartTotal * (tax / 100)).toFixed(2);
  const total = (cartTotal + Number(serviceFeeAmt) + Number(taxAmt)).toFixed(2);

  const confirmOrder = async () => {
    try {
      const updatedData = normaliseCartData(myCart);
      const data = await mutateAsync(updatedData);
      const orderId = data?.orderId;
      if (!orderId) throw new Error("The order was created, but its confirmation could not be loaded.");
      clearCart();
      navigate(`/restaurant/${restaurantSlugName}/order/${orderId}?table=${table}`, {
        state: {
          notification: {
            variant: "success",
            message: "Order placed successfully. Your order has been sent to the kitchen.",
          },
        },
      });
    } catch (orderError: unknown) {
      const serverMessage = axios.isAxiosError(orderError)
        ? orderError.response?.data?.message
        : undefined;
      const message = typeof serverMessage === "string"
        ? serverMessage
        : orderError instanceof Error
          ? orderError.message
          : "Unable to place your order. Please try again.";
      showNotification({ variant: "error", message });
    }
  };

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
  if (isRestaurantPending || isSessionPending || isSessionFetching) {
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

  if (isSessionError && axios.isAxiosError(sessionError) && sessionError.response?.status === 401) {
    return <Navigate to={`/restaurant/${restaurantSlugName}?table=${encodeURIComponent(table)}`} replace />;
  }

  if (isSessionError) {
    return (
      <ContentState
        type="error"
        title="Unable to check your session"
        description={sessionError instanceof Error ? sessionError.message : "Please check your connection and try again."}
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

  const session = sessionValidation?.session;
  const sessionMatchesPage = Boolean(
    sessionValidation?.valid &&
    String(session?.restaurantId) === String(restaurantDetails._id) &&
    Number(session?.table) === Number(table),
  );

  if (!sessionMatchesPage) {
    return <Navigate to={`/restaurant/${restaurantSlugName}?table=${encodeURIComponent(table)}`} replace />;
  }

  return (
    <div className={styles.page}>
      <CustomerHeader
        restaurant={restaurantDetails.name}
        restaurantId={restaurantDetails._id}
        slug={restaurantSlugName}
        table={table}
      />

      {notification && (
        <Notification
          variant={notification.variant}
          message={notification.message}
          onClose={dismissNotification}
        />
      )}

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
              <CartItems handleEdit={handleEdit} handleDelete={handleDelete} />
            </main>

            <aside className={styles.summaryColumn}>
              <OrderSummary
                onContinueShopping={() =>
                  navigate(
                    `/restaurant/${restaurantSlugName}/menu?table=${table}`,
                  )
                }
                subtotal={cartTotal.toFixed(2)}
                serviceFee={serviceFeeAmt}
                tax={taxAmt}
                onConfirmOrder={confirmOrder}
                total={total}
                isPending={isPending}
                isError={isError}
                error={error}
              />
              <CartNotices />
            </aside>
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <Drawer
          anchor={isMobile ? "bottom" : "right"}
          open={isDrawerOpen}
          onClose={handleDrawer}
          slotProps={{
            paper: {
              className: styles.drawerPaper,
            },
          }}
        >
          <div className={styles.drawerContent}>
            {isFetching && (
              <FeedbackState
                type="loading"
                title="Loading customization..."
                description="Getting the latest options for this item."
              />
            )}

            {isFetchError && (
              <FeedbackState
                type="error"
                title="Unable to edit this item"
                description={
                  fetchError?.message ||
                  "We couldn't load the item's customization options."
                }
              />
            )}

            {selectedItem && menuItem && !isFetchError && !isFetching && (
              <ItemCustomizer
                item={menuItem}
                handleClose={handleDrawer}
                cartItem={selectedItem}
                handleToast={handleShowToast}
              />
            )}
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default Cart;

