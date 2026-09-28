import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { styles as FilterDropdownStyles } from "../../styles/Kitchen/FilterDropdown";
import type { FilterDropdownProps } from "../../types/KitchenOrder";

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={FilterDropdownStyles.container}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={FilterDropdownStyles.button}
      >
        <span>{selectedOption?.label || label}</span>

        <ChevronDown
          size={16}
          className={`${FilterDropdownStyles.icon} ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className={FilterDropdownStyles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={FilterDropdownStyles.option}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;