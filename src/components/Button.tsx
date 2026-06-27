type buttonProps = {
    text?: string;
    icon?: React.ReactNode;
    variant?: string;
    classes?: string;
}& React.ButtonHTMLAttributes<HTMLButtonElement> 

const variants: Record<string, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    transparent: "bg-transparent border border-gray-600 text-gray-800 hover:bg-gray-100",
    transparentGreen:"bg-transparent border border-emerald-600 text-emerald-800 hover:bg-emerald-100",
    transparentRed:"bg-transparent border border-red-600 text-red-800 hover:bg-red-100",
}

const base: string = "inline-flex items-center gap-2 px-4 py-2 rounded-md"

const Button = ({text, icon, variant = "primary", classes, ...props}:buttonProps) => {
  return (
    <div>
      <button className={`${base} ${variants[variant]} ${classes || ''}`} {...props}>
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
    </div>
  )
}

export default Button
