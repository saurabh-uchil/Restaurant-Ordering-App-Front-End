import axios from "axios";
import { useEffect, useState } from "react";
import AddOptions from "./BrowseOptionGroups";
import BrowseDietaryAlternatives from "./BrowseDietaryAlternatives";
import BrowseAddons from "./BrowseAddons";
import { CircularProgress } from "@mui/material";
import { browseDrawerStyles } from "../styles/browseDrawer";

function MenuDrawer({component, dietaryAlternatives, setDietaryAlternatives, addons, setAddons, optionGroups, setOptionGroups}) {

const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<any[]>([]);

const baseURL = "http://localhost:3000/menu";

const endPoint = component === "Options" ? `${baseURL}/options` : component === "Dietary" ? `${baseURL}/dietary-alternatives` : `${baseURL}/addons`;


 async function fetchData() {
        try {
            const response = await axios.get(endPoint);
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

function fetchView() {
    switch(component) {
        case "Options":
            return <div>
                <AddOptions data={data} optionGroups={optionGroups} setOptionGroups={setOptionGroups}/>
            </div>;
        case "Dietary":
            return <div>
                <BrowseDietaryAlternatives data={data} dietaryAlternatives={dietaryAlternatives} setDietaryAlternatives={setDietaryAlternatives}/>
            </div>;    
        case "Addons":    
            return <div>
                <BrowseAddons data={data} addons={addons} setAddons={setAddons} />
            </div>;
    }
}

const view = fetchView();

useEffect(() => {
    fetchData();
}, []);



  return (
    <div>
        <div className={browseDrawerStyles.drawerContent}>
            {isLoading ? (
                <div className={browseDrawerStyles.drawerContentLoading}>
                    <CircularProgress size={40} aria-label="Loading…" />
                </div>
            ) : error ? (
                <div className={browseDrawerStyles.drawerContentLoading}>
                    <p className={browseDrawerStyles.errorLoadingMessage}>Error: {error}</p>
                </div>
            ) : (
                view
            )}
        </div>
    </div>
  )
}

export default MenuDrawer;
