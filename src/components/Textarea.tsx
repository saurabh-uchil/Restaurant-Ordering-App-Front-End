/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { textareaStyles } from "../styles/customComponents";

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
     <div className={textareaStyles.container}>
      
      <label htmlFor={id} className={textareaStyles.label}>
        {label}
      </label>

      <textarea id={id} placeholder={placeholder} {...register(id, rules)} className={textareaStyles.textarea} />

      {error && (
        <p className={textareaStyles.error}>
          {error.message}
        </p>
      )}
    </div>
  )
}

export default Textarea
