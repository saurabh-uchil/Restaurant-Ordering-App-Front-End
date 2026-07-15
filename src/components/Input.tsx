/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

export type InputProps = {
    id: string;
    type?: string;
    label?: string;   
    extraClass?: string;
    placeholder?: string;
    error?: any;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
}& React.InputHTMLAttributes<HTMLInputElement>

const Input = ({id, type, label, placeholder, extraClass, error, register, rules}: InputProps) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-black-700 mb-1">{label}</label>} 
      <input id={id} type={type} placeholder={placeholder} {...register(id, rules)} className={`w-full h-11 px-4 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-200 focus:border-[#28085e] focus:ring-4 focus:ring-[#28085e]/10 focus:outline-none ${extraClass || ''}`}/>
      {error?.message && 
      (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      )}
    </div>
  )
}

export default Input;
