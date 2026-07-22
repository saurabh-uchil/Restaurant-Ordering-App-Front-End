import type { LucideIcon } from "lucide-react";
import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import type { InputHTMLAttributes } from "react";

import { formInputStyles as style } from "../../styles/formInput";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
  icon?: LucideIcon;
  extraClass?: string;
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

const FormInput = <T extends FieldValues>({
  name,
  register,
  rules,
  error,
  icon: Icon,
  extraClass,
  label,
  ...inputProps
}: FormInputProps<T>) => {
  const hasError = Boolean(error);

  return (
    <div className={style.container}>
      
      {label && (
        <label htmlFor={name} className={style.label}>
          {label}
        </label>
      )}

      <div className={style.inputWrapper}>
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className={`${style.icon} ${
              hasError ? style.iconError : style.iconDefault
            }`}
          />
        )}

        <input
          id={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...inputProps}
          {...register(name, rules)}
          className={`${style.input} ${
            hasError ? style.inputError : style.inputDefault
          } ${Icon ? style.inputWithIcon : style.inputWithoutIcon} ${
            extraClass ?? ""
          }`}
        />
        
      </div>

      {error?.message && (
        <p id={`${name}-error`} className={style.errorText}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;