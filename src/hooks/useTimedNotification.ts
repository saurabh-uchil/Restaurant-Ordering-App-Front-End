import { useEffect, useState } from "react";

export type TimedNotificationValue = {
  variant: "success" | "error" | "warning" | "info";
  message: string;
};

export const useTimedNotification = (initialValue: TimedNotificationValue | null = null) => {
  const [notification, setNotification] = useState<TimedNotificationValue | null>(initialValue);

  useEffect(() => {
    if (!notification) return;

    const timeout = window.setTimeout(() => setNotification(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  return {
    notification,
    showNotification: setNotification,
    dismissNotification: () => setNotification(null),
  };
};
