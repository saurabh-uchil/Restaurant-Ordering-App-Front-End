/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { selectStyles } from "../styles/customComponents";

type SelectProps = {
    name: string;
    options: string[];
    label: string;
    error?: any;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
}



const Select = ({name, options, label, rules, register, error,}: SelectProps) => {
  return (
    <div className={selectStyles.container}>
      <label
        htmlFor={name}
        className={selectStyles.label}
      >
        {label}
      </label>

      <select id={name} {...register(name, rules)} className={selectStyles.select} >
        <option value="" className={selectStyles.placeholder}>
            Select {label}
        </option>

        {options.map((option) => (
            <option
            key={option}
            value={option}
            className={selectStyles.option}
            >
            {option}
            </option>
        ))}
      </select>

      {error && (
        <p className={selectStyles.error}>
          {error.message}
        </p>
      )}
    </div>
  );
};


export default Select
