/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type TextareaProps = {
        id: string;
        label: string;  
        placeholder?: string; 
        error?: any;
        register: UseFormRegister<any>;
        rules?: RegisterOptions;
    }& React.InputHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({ id, label, placeholder, error, register, rules }: TextareaProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-black-700 mb-1">{label}</label> 
      <textarea id={id} placeholder={placeholder} {...register(id, rules)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}

export default Textarea
