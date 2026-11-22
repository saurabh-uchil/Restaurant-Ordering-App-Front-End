
import { useParams, useSearchParams } from "react-router";
import { useRestuarant, useGetMenu } from "../api/apihooks/useRestaurant";
import CustomerHeader from "../components/CustomerPage/CustomerHeader";
import ContentState from "../components/ContentState";
import {
  customerHeaderStyles as styles,
  customerMenuPageStyles as pageStyles,
} from "../styles/CustomerPage/customerPage";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import Cards from "../components/Cards";
import { filters } from "../data/filters";
import ItemCustomizer from "../components/CustomerPage/ItemCustomizer";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import Notification from "../components/Notification";
import {
  useValidateSession,
  useGetOrdersBySessionId,
} from "../api/apihooks/useOrder";
import ExistingOrdersDrawer from "../components/CustomerPage/ExisitngOrdersDrawer";

const CustomerMenuPage = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  // Validate dining session
  const {
    isPending: isValidPending,
    error: sessionError,
    isError: isSessionError,
  } = useValidateSession();

  // Fetch existing orders after session validation
  const {
    data: orders = [],
    isPending: isOrdersPending,
    isError: isOrdersError,
    refetch: refetchOrders,
  } = useGetOrdersBySessionId(!isValidPending && !isSessionError);

  const existingOrdersCount = orders.length;

  // Fetch menu
  const {
    data: menu = [],
    isPending: isMenuPending,
    isError: isMenuError,
    error: menuError,
  } = useGetMenu(restaurantSlugName);

  // Fetch restaurant
  const {
    data: restaurantDetails,
    isPending: isRestaurantPending,
    isError: isRestaurantError,
    error: restaurantError,
  } = useRestuarant(restaurantSlugName);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Item customizer drawer
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Existing orders drawer
  const [isOrdersDrawerOpen, setIsOrdersDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Notifications
  const [showToast, setShowToast] = useState({
    visible: false,
    itemName: "",
  });

  const handleShowToast = (itemName: string) => {
    setShowToast({ visible: true, itemName });

    setTimeout(() => {
      setShowToast({ visible: false, itemName: "" });
    }, 3000);
  };

  // Item customizer handlers
  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSelectedItem(null);
    setIsDrawerOpen(false);
  };

  // Existing orders drawer handlers
  const handleOrdersOpen = () => {
    setIsOrdersDrawerOpen(true);
  };

  const handleOrdersClose = () => {
    setIsOrdersDrawerOpen(false);
  };

  // Filter menu
  const filteredData =
    selectedFilter === "All"
      ? menu
      : menu.filter((item) => item.course === selectedFilter);

  const searchedData = filteredData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const card = searchedData.map((item) => (
    <Cards
      key={item._id}
      item={item}
      mode="customer"
      onAddToCart={handleAddToCart}
    />
  ));

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

  // Loading requests
  if (isMenuPending || isRestaurantPending || isValidPending) {
    return (
      <ContentState
        type="loading"
        title="Loading menu..."
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

  // Session validation failed
  if (isSessionError) {
    return (
      <ContentState
        type="error"
        title="Unable to load restaurant"
        description={
          sessionError?.message ||
          "Something went wrong while loading the session."
        }
      />
    );
  }

  // Menu request failed
  if (isMenuError) {
    return (
      <ContentState
        type="error"
        title="Unable to load menu"
        description={
          menuError?.message ||
          "Something went wrong while loading the menu."
        }
      />
    );
  }

  // Restaurant not found
  if (!restaurantDetails) {
    return (
      <ContentState
        type="empty"
        title="Restaurant not found"
        description="This restaurant may no longer be available."
      />
    );
  }

  // Empty menu
  if (!menu || menu.length === 0) {
    return (
      <ContentState
        type="empty"
        title="No menu items available"
        description="This restaurant hasn't added any menu items yet."
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <CustomerHeader
          restaurant={restaurantDetails.name}
          slug={restaurantSlugName}
          table={table}
          existingOrdersCount={existingOrdersCount}
          onOrdersClick={handleOrdersOpen}
        />

        {showToast.visible && (
          <Notification
            variant="success"
            message={`${showToast.itemName} added to cart`}
            onClose={() =>
              setShowToast({
                visible: false,
                itemName: "",
              })
            }
          />
        )}

        <section className={pageStyles.hero}>
          <p className={pageStyles.heroEyebrow}>Table {table}</p>

          <h2 className={pageStyles.heroTitle}>
            What would you like to eat?
          </h2>

          <p className={pageStyles.heroDescription}>
            Browse the menu and choose something you’ll enjoy.
          </p>
        </section>

        <section className={pageStyles.menuSection}>
          <div className={pageStyles.controls}>
            <Filters
              filterArray={filters}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholderText="Search menu"
            />
          </div>

          <div className={pageStyles.menuGrid}>{card}</div>
        </section>
      </div>

      {/* Item Customizer Drawer */}
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        {selectedItem && (
          <ItemCustomizer
            item={selectedItem}
            handleClose={handleDrawerClose}
            handleToast={handleShowToast}
          />
        )}
      </Drawer>

      {/* Existing Orders Drawer */}
      <ExistingOrdersDrawer
        open={isOrdersDrawerOpen}
        onClose={handleOrdersClose}
        orders={orders}
        table={table}
        isLoading={isOrdersPending}
        isError={isOrdersError}
        onRetry={() => refetchOrders()}
      />
    </div>
  );
};

export default CustomerMenuPage;
