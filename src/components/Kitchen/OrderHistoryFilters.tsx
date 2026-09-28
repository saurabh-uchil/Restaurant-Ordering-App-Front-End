import { dateOptions, totalOptions } from "../../data/filters";
import type { OrderFiltersProps } from "../../types/KitchenOrder";
import SearchBar from "../SearchBar";
import FilterDropdown from "./FilterDropdown";
import { styles as OrderHistoryFiltersStyles } from "../../styles/Kitchen/OrderHistoryFIlters";

const OrderHistoryFilters = ({ filters, setFilters, tableOptions }: OrderFiltersProps) => {
  return (
    <div className={OrderHistoryFiltersStyles.container}>
      <div className={OrderHistoryFiltersStyles.search}>
        <SearchBar
          searchTerm={filters.orderNumber}
          setSearchTerm={(value: string) =>
            setFilters((prev) => ({
              ...prev,
              orderNumber: value,
            }))
          }
          placeholderText="Search order number..."
        />
      </div>

      <div className={OrderHistoryFiltersStyles.filters}>
        <FilterDropdown
          label="Date"
          options={dateOptions}
          value={filters.date}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              date: value,
            }))
          }
        />

        <FilterDropdown
          label="Total"
          options={totalOptions}
          value={filters.total}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              total: value,
            }))
          }
        />

        <FilterDropdown
          label="Table"
          options={tableOptions}
          value={filters.table}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              table: value,
            }))
          }
        />
      </div>
    </div>
  );
};

export default OrderHistoryFilters;