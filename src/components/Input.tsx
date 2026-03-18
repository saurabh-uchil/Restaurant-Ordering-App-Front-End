/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

export type InputProps = {
    id: string;
    type: string;
    label: string;   
    extraClass?: string;
    placeholder?: string;
    error?: any;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
}& React.InputHTMLAttributes<HTMLInputElement>

const Input = ({id, type, label, placeholder, extraClass, error, register, rules}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-black-700 mb-1">{label}</label> 
      <input id={id} type={type} placeholder={placeholder} {...register(id, rules)} className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${extraClass || ''}`}/>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}

export default Input;
