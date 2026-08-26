import { Loader2, CircleAlert } from "lucide-react";
import { FeedbackStateStyles as styles } from "../styles/feedbackState";

type FeedbackStateProps = {
  type: "loading" | "error";
  title: string;
  description: string;
};

const FeedbackState = ({
  type,
  title,
  description,
}: FeedbackStateProps) => {
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

export default FeedbackState;