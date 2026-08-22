import { Loader2, CircleAlert } from "lucide-react";
import { drawerStateStyles as styles } from "../styles/drawerState";

type DrawerStateProps = {
  type: "loading" | "error";
  title: string;
  description: string;
};

const DrawerState = ({
  type,
  title,
  description,
}: DrawerStateProps) => {
  const Icon = type === "loading" ? Loader2 : CircleAlert;

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Icon
          size={22}
          className={type === "loading" ? styles.loader : styles.errorIcon}
        />
      </div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default DrawerState;