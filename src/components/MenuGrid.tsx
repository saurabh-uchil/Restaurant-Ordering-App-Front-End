import { useState } from "react";
import { viewMenuStyles } from "../styles/viewMenuStyles";
import Cards from "./Cards";
import Filters from "./Filters";
import SearchBar from "./SearchBar";


const MenuGrid = ({mode, data}) => {

    const filters = ['All', 'Entree', 'Mains', 'Dessert', 'Kids', 'Sides', 'Steaks'];

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = selectedFilter === 'All' ? data : data.filter((item) => item.course === selectedFilter);
    const searchedData = filteredData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));    

    const card = searchedData.map((item) => {
        return (
            <Cards key={item._id} item={item}/>
        )})
     
  return (
    <div className={viewMenuStyles.cardContainer}>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center px-4 lg:px-0">
        <Filters filterArray={filters} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className={viewMenuStyles.cardGridCols}>
        {card}
      </div>
    </div>
  )
}

export default MenuGrid
