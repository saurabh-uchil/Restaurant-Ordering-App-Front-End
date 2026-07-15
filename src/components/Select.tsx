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
        <select {...register(name, rules)} className="w-full h-11 px-4 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-200 focus:border-[#28085e] focus:ring-4 focus:ring-[#28085e]/10 focus:outline-none">
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
