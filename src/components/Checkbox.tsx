/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { checkboxStyles } from "../styles/customComponents";

type CheckboxProps = {
    label?: string;
    name: string;
    value: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    error?: any;
}& React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({
  label,
  name,
  value,
  register,
  rules,
  error,
}: CheckboxProps) => {
  return (
    <div className={checkboxStyles.container}>
      <label className={checkboxStyles.label}>
        <input
          type="checkbox"
          value={value}
          {...register(name, rules)}
          className={checkboxStyles.checkbox}
        />

        <span className={checkboxStyles.text}>
          {label}
        </span>
      </label>

      {error && (
        <p className={checkboxStyles.error}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Checkbox;