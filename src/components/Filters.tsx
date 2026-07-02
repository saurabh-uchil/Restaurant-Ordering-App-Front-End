import { filterStyles } from "../styles/filters";


const Filters = ({filterArray,selectedFilter,setSelectedFilter}) => {
  return (
    <div className={filterStyles.container}>
      <div className={filterStyles.buttonGroup}>
        {filterArray.map((filter) => (
          <button key={filter} onClick={() => setSelectedFilter(filter)} className={selectedFilter === filter
                ? filterStyles.activeButton
                : filterStyles.button}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;