import { CircleAlert, LoaderCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "./Button";
import { contentStateStyles } from "../styles/contentState";


type ContentStateProps = {
  type: "loading" | "error" | "empty";
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
};

type StateContentProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
};

const StateContent = ({ title, description, children, actionText, onAction }: StateContentProps) => {
  return (
    <div className={contentStateStyles.content}>
      {children}

      <p className={contentStateStyles.title}>{title}</p>

      {description && (
        <p className={contentStateStyles.description}>{description}</p>
      )}

      {actionText && onAction && (
        <div className={contentStateStyles.action}>
          <Button type="button" text={actionText} variant="formPrimary" onClick={onAction} />
        </div>
      )}
    </div>
  );
};

const LoaderState = ({ title, description }: Pick<ContentStateProps, "title" | "description">) => {
  return (
    <StateContent title={title} description={description}>
      <LoaderCircle size={28} className={contentStateStyles.loadingIcon} />
    </StateContent>
  );
};

const ErrorState = ({ title, description, actionText, onAction }: Pick<ContentStateProps, "title" | "description" | "actionText" | "onAction">) => {
  return (
    <StateContent title={title} description={description} actionText={actionText} onAction={onAction}>
      <div className={contentStateStyles.errorIconContainer}>
        <CircleAlert size={21} />
      </div>
    </StateContent>
  );
};

const EmptyState = ({ title, description, icon: Icon, actionText, onAction }: Omit<ContentStateProps, "type">) => {
  return (
    <StateContent title={title} description={description} actionText={actionText} onAction={onAction}>
      <div className={contentStateStyles.iconContainer}>
        {Icon && <Icon size={21} />}
      </div>
    </StateContent>
  );
};

export const ContentState = ({ type, title, description, icon, actionText, onAction }: ContentStateProps) => {
  return (
    <div className={contentStateStyles.container}>
      {type === "loading" && (
        <LoaderState title={title} description={description} />
      )}

      {type === "error" && (
        <ErrorState title={title} description={description} actionText={actionText} onAction={onAction} />
      )}

      {type === "empty" && (
        <EmptyState title={title} description={description} icon={icon} actionText={actionText} onAction={onAction} />
      )}
    </div>
  );
};

export default ContentState;