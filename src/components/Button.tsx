import { LoaderCircle } from "lucide-react";
import { buttonStyles, buttonTextStyles } from "../styles/customComponents";

type ButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  variant?: string;
  classes?: string;
  isLoading?: boolean;
  loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, icon, variant = "primary", classes, isLoading = false, loadingText, disabled, ...props }: ButtonProps) => {
  return (
    <div>
      <button className={`${buttonStyles.base} ${buttonStyles[variant]} ${classes || ""}`} disabled={disabled || isLoading} {...props}>
        {isLoading ? <LoaderCircle size={14} className="animate-spin" /> : icon && <span>{icon}</span>}
        <span className={buttonTextStyles[variant]}>{isLoading ? loadingText || text : text}</span>
      </button>
    </div>
  );
};

export default Button;