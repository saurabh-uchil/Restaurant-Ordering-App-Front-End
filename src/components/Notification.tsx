import { CheckCircle2,CircleAlert, Info, TriangleAlert, X} from "lucide-react";
import { notificationStyles } from "../styles/notification";

type NotificationVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

type NotificationProps = {
  variant?: NotificationVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
};

const notificationIcons = {
  success: CheckCircle2,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
};

const Notification = ({
  variant = "success",
  title,
  message,
  onClose,
  actionLabel,
  onAction,
  actionDisabled = false,
}: NotificationProps) => {
  const Icon = notificationIcons[variant];

  return (
    <div
      className={`${notificationStyles.container} ${notificationStyles.variants[variant]}`}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      <div className={notificationStyles.content}>
        <div className={`${notificationStyles.iconContainer} ${notificationStyles.iconVariants[variant]}`}>
          <Icon size={16} className={notificationStyles.icon} />
        </div>

        <div className={notificationStyles.textContainer}>
          {title && <strong className={notificationStyles.title}>{title}</strong>}
          <span className={notificationStyles.message}>{message}</span>
          {actionLabel && onAction && (
            <button
              type="button"
              className={notificationStyles.actionButton}
              onClick={onAction}
              disabled={actionDisabled}
              aria-busy={actionDisabled}
            >
              {actionLabel}
            </button>
          )}
        </div>
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
