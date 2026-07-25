import { AlertCircle, CheckCircle2 } from "lucide-react";
import { alertStyles } from "../../styles/alertMessages";


type AlertType = {
  message: string;
  type: "success" | "error";
};

const AlertMessage = ({ message, type }: AlertType) => {
  if (!message) return null;

  const isSuccess = type === "success";
  const containerClass = isSuccess ? alertStyles.success : alertStyles.error;
  const icon = isSuccess ? <CheckCircle2 className={alertStyles.icon} /> : <AlertCircle className={alertStyles.icon} />
  
  return (
    <div className={`${alertStyles.container} ${containerClass}`}>
      
      {icon}
      <span className={alertStyles.message}>{message}</span>
      
    </div>
  );
};

export default AlertMessage;
