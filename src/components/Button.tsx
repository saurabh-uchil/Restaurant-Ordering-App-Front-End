import { buttonStyles, buttonTextStyles } from "../styles/customComponents";

type buttonProps = {
    text?: string;
    icon?: React.ReactNode;
    variant?: string;
    classes?: string;
}& React.ButtonHTMLAttributes<HTMLButtonElement> 


const Button = ({text, icon, variant = "primary", classes, ...props}:buttonProps) => {
  return (
    <div>
      <button className={`${buttonStyles.base} ${buttonStyles[variant]} ${classes || ''}`} {...props}>
      {icon && <span>{icon}</span>}
      <span className={buttonTextStyles[variant]}>{text}</span>
    </button>
    </div>
  )
}

export default Button
