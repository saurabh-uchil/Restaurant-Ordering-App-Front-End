import { X } from "lucide-react";
import { itemCustomizerStyles as styles } from "../../styles/CustomerPage/itemCustomizer";

type ItemCustomizerProps = {
  item: any;
  handleClose: () => void;
};

const ItemCustomizer = ({
  item,
  handleClose,
}: ItemCustomizerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.mobileHandle} />

      <header className={styles.header}>
        <div>
          <p className={styles.label}>Customize your order</p>
          <h2 className={styles.title}>{item.name}</h2>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close item customizer"
        >
          <X size={19} />
        </button>
      </header>

      <div className={styles.content}>
        <form>
            <label>Special Instructions</label>
            <textarea placeholder="Add a note for the chef"/>
        </form>
      </div>
    </div>
  );
};

export default ItemCustomizer;