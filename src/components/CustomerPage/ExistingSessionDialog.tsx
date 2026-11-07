import { ConciergeBell, X, UsersRound } from "lucide-react";
import { styles } from "../../styles/CustomerPage/existingSessionDialog";


interface ExistingOrderDialogProps {
  isOpen: boolean;
  table: number;
  onCancel: () => void;
  onJoin: () => void;
}

const ExistingOrderDialog = ({
  isOpen,
  table,
  onCancel,
  onJoin,
}: ExistingOrderDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="existing-order-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className={styles.iconWrapper}>
          <ConciergeBell size={32} />
        </div>

        <h2
          id="existing-order-title"
          className={styles.title}
        >
          An existing order was found
        </h2>

        <p className={styles.description}>
          There's already an active dining session for{" "}
          <strong className={styles.table}>
            Table {table}
          </strong>.
        </p>

        <p className={styles.description}>
          Join the existing session to view current orders
          and add more items.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.joinButton}
            onClick={onJoin}
          >
            <UsersRound size={18} />
            Join Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingOrderDialog;
