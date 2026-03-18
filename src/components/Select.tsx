/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type SelectProps = {
    name: string;
    options: string[];
    label: string;
    error?: any;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
}

    
const Select = ({name, options, label, rules, register, error}: SelectProps) => {
  return (
    <div className="mb-4">
        <label className="block text-sm font-medium text-black-700 mb-1">{label}</label>
        <select {...register(name, rules)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select {label}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}

export default Select
