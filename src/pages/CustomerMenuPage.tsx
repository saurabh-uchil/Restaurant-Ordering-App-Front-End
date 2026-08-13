import { useParams, useSearchParams } from "react-router";
import { useGetMenu,useRestuarant} from "../api/apihooks/useRestaurant";
import CustomerHeader from "../components/CustomerPage/CustomerHeader";
import ContentState from "../components/ContentState";
import { customerHeaderStyles as styles } from "../styles/CustomerPage/customerPage";
import { viewMenuStyles } from "../styles/viewMenuStyles";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import Cards from "../components/Cards";

const CustomerMenuPage = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const {
    data: menu,
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

  const filters = ['All', 'Entree', 'Mains', 'Dessert', 'Kids', 'Sides', 'Steaks'];

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = selectedFilter === 'All' ? menu : menu.filter((item) => item.course === selectedFilter);
    const searchedData = filteredData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));    

    const card = searchedData.map((item) => {
        return (
            <Cards key={item._id} item={item} mode="customer"/>
        )})

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
          menuError?.message ||
          "Something went wrong while loading the menu."
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
        <CustomerHeader
          restaurant={restaurantDetails.name}
          table={table}
        />

        {/* Search */}

        {/* Filters */}

        {/* Customer Menu */}

         <div className={viewMenuStyles.cardContainer}>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center px-4 lg:px-0">
            <Filters filterArray={filters} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </div>
          <div className={viewMenuStyles.cardGridCols}>
            {card}
          </div>
         </div>

      </div>
    </div>
  );
};

export default CustomerMenuPage;