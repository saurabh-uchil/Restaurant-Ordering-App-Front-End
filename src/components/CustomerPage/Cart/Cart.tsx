import { useNavigate, useParams, useSearchParams } from "react-router";
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
import { useOrder } from "../../../api/apihooks/useOrder";
import { normaliseCartData } from "../../../services/structureCartData";

const Cart = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const myCart = useCart((state) => state.myCart);
  const deleteCartItem = useCart((state) => state.deleteCartItem);
  const clearCart = useCart((state) => state.clearCart);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [showToast, setShowToast] = useState<{
    visible: boolean;
    itemName: string;
    variant: "success" | "error" | "warning" | "info";
  }>({ visible: false, itemName: "", variant: "success" });

  const handleShowToast = (
    itemName: string,
    variant: "success" | "error" | "warning" | "info" = "success",
  ) => {
    setShowToast({ visible: true, itemName, variant });

    setTimeout(() => {
      setShowToast({ visible: false, itemName: "", variant: "success" });
    }, 3000);
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

  const restaurantId = restaurantDetails && restaurantDetails._id;

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
      const updatedData = normaliseCartData(myCart, table, restaurantId);
      const data = await mutateAsync(updatedData);
      const orderId = data?.orderId;
      clearCart();
      navigate(`/restaurant/${restaurantSlugName}/order/${orderId}?table=${table}`);
    } catch (e) {
      console.log(e);
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

  return (
    <div className={styles.page}>
      <CustomerHeader
        restaurant={restaurantDetails.name}
        slug={restaurantSlugName}
        table={table}
      />

      {showToast.visible && (
        <Notification
          variant={showToast.variant}
          message={
            showToast.variant == "error"
              ? `${showToast.itemName} removed from the cart`
              : `${showToast.itemName} updated successfully`
          }
          onClose={() =>
            setShowToast({
              visible: false,
              itemName: "",
              variant: "success",
            })
          }
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
