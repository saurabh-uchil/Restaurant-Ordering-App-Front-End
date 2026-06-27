import axios from "axios";
import { useEffect, useState } from "react";
import AddOptions from "./BrowseOptionGroups";
import BrowseDietaryAlternatives from "./BrowseDietaryAlternatives";
import BrowseAddons from "./BrowseAddons";

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
                <h2 className="text-lg font-semibold mb-4">Option Groups</h2>
                <AddOptions data={data} optionGroups={optionGroups} setOptionGroups={setOptionGroups}/>
            </div>;
        case "Dietary":
            return <div>
                <h2 className="text-lg font-semibold mb-4">Dietary Options</h2>
                <BrowseDietaryAlternatives data={data} dietaryAlternatives={dietaryAlternatives} setDietaryAlternatives={setDietaryAlternatives}/>
            </div>;    
        case "Addons":    
            return <div>
                <h2 className="text-lg font-semibold mb-4">Add-ons</h2>
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
        <div className="p-4 w-90">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                view
            )}
        </div>
    </div>
  )
}

export default MenuDrawer;
