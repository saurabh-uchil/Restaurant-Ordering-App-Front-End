import { FaSearch } from "react-icons/fa";
import { searchBarStyles } from "../styles/searchBar";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={searchBarStyles.container}>
      <div className={searchBarStyles.wrapper}>
        <FaSearch  className={searchBarStyles.icon} />

        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={searchBarStyles.input}
        />
      </div>
    </div>
  );
};

export default SearchBar;