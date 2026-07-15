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
    <div className="mb-3">
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          value={value}
          {...register(name, rules)}
          className="h-4 w-4 rounded border-gray-300 text-[#28085e] focus:ring-2 focus:ring-[#28085e]/20 focus:ring-offset-0"
        />

        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>

      {error && (
        <div className="mt-1 text-xs text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Checkbox
