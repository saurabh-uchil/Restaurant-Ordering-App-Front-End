import { useEffect } from "react";
import FormCard from "../components/FormCard";
import axios from "axios";

import MenuGrid from "../components/MenuGrid";
import useFetchAPIHook from "../hooks/usefetchAPIHook";
import { CircularProgress } from "@mui/material";
import { menuCardStyles } from "../styles/viewMenuStyles";

const ViewMenu = () => {
    const {data: menuItems, setData: setMenuItems, isLoading, setIsLoading, setError, hasError} = useFetchAPIHook();
    const view = 
      isLoading ? <div className={menuCardStyles.loadingContainer}><CircularProgress size={40} aria-label="Loading…" /></div> 
    : hasError ? <div className={menuCardStyles.loadingContainer}><p className={menuCardStyles.errorLoadingMessage}>Error loading menu items</p></div> 
    : <MenuGrid mode="menu" data={menuItems} />;

    useEffect(() => {
        async function fetchMenuItems() {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:3000/menu");
                setMenuItems(response.data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMenuItems();
    }, [])

  return (
    <FormCard title="View Menu">
        {view}
    </FormCard>
  )
}

export default ViewMenu
