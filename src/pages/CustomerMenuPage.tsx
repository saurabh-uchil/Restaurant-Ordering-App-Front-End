import { useParams, useSearchParams } from "react-router";
import { useGetMenu, useRestuarant } from "../api/apihooks/useRestaurant";
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

const CustomerMenuPage = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const {
    data: menu = [],
    isPending: isMenuPending,
    isError: isMenuError,
    error: menuError,
  } = useGetMenu(restaurantSlugName);

  const {
    data: restaurantDetails,
    isPending: isRestaurantPending,
    isError: isRestaurantError,
    error: restaurantError,
  } = useRestuarant(restaurantSlugName);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData =
    selectedFilter === "All"
      ? menu
      : menu.filter((item) => item.course === selectedFilter);

  const searchedData = filteredData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(
  theme.breakpoints.down("sm")
  );

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSelectedItem(null);
    setIsDrawerOpen(false);
  };

  const card = searchedData.map((item) => {
    return (
      <Cards
        key={item._id}
        item={item}
        mode="customer"
        onAddToCart={handleAddToCart}
      />
    );
  });

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

  // Loading either request
  if (isMenuPending || isRestaurantPending) {
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

  // Menu request failed
  if (isMenuError) {
    return (
      <ContentState
        type="error"
        title="Unable to load menu"
        description={
          menuError?.message || "Something went wrong while loading the menu."
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

  // Restaurant exists but has no menu items
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
        <CustomerHeader restaurant={restaurantDetails.name} />

        <section className={pageStyles.hero}>
          <p className={pageStyles.heroEyebrow}>Table {table}</p>

          <h2 className={pageStyles.heroTitle}>What would you like to eat?</h2>

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
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <div className={pageStyles.menuGrid}>{card}</div>
        </section>
      </div>

      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        {selectedItem && (
          <ItemCustomizer item={selectedItem} handleClose={handleDrawerClose} />
        )}
      </Drawer>
    </div>
  );
};

export default CustomerMenuPage;
