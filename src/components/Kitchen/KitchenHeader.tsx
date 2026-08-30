import { Menu } from "lucide-react";
import { kitchenHeaderStyles as styles } from "../../styles/Kitchen/KitchenHeader";
import { getDate } from "../../services/dateFormatter";

type KitchenHeaderProps = {
  name: string;
  toggle: () => void;
};

const KitchenHeader = ({ name, toggle }: KitchenHeaderProps) => {
  return (
    <header className={styles.header}>
      <button
        type="button"
        onClick={toggle}
        className={styles.menuIcon}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className={styles.restaurantInfo}>
        <h1 className={styles.restaurantName}>{name}</h1>

        <p className={styles.subtitle}>Kitchen</p>
      </div>

      <div className={styles.date}>{getDate()}</div>

      <div className={styles.connectionStatus}>
        <span className={styles.statusDot} />
        <span>Live</span>
      </div>

    </header>
  );
};

export default KitchenHeader;
