/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { inputStyles } from "../styles/customComponents";

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
      {label && (
        <label htmlFor={id} className={inputStyles.label} >
        {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
        className={inputStyles.input + " " + extraClass}
      />

      {error?.message && (
        <p className={inputStyles.error}>
          {error.message}
        </p>
      )}
  
    </div>
  )
}

export default Input;
