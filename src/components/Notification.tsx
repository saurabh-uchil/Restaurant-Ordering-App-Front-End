import { CheckCircle2,CircleAlert, Info, TriangleAlert, X} from "lucide-react";
import { notificationStyles } from "../styles/notification";

type NotificationVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

type NotificationProps = {
  variant?: NotificationVariant;
  message: string;
  onClose?: () => void;
};

const notificationIcons = {
  success: CheckCircle2,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
};

const Notification = ({ variant = "success", message, onClose }: NotificationProps) => {
  const Icon = notificationIcons[variant];

  return (
    <div className={`${notificationStyles.container} ${notificationStyles.variants[variant]}`}>
      <div className={notificationStyles.content}>
        <div className={`${notificationStyles.iconContainer} ${notificationStyles.iconVariants[variant]}`}>
          <Icon size={16} className={notificationStyles.icon} />
        </div>

        <span className={notificationStyles.message}>{message}</span>
      </div>

      {onClose && (
        <button type="button" className={notificationStyles.closeButton} onClick={onClose} aria-label="Dismiss notification">
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default Notification;