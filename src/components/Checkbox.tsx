/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type CheckboxProps = {
    label: string;
    name: string;
    value: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    error?: any;
}& React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ label, name, value, register, rules, error }: CheckboxProps) => {
  return (
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          className="mr-2 leading-tight"
          {...register(name, rules)}
          value={value}
        />
        <span className="text-sm text-black-700">{label}</span>
      </label>
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  )
}

export default Checkbox
