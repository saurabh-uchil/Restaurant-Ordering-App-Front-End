import { orderSectionStyles as styles } from "../../styles/Kitchen/OrderSection";

type OrderSectionProps = {
  title: string;
  count: number;
  children: React.ReactNode;
};

const OrderSection = ({
  title,
  count,
  children,
}: OrderSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>

          <span className={styles.count}>{count}</span>
        </div>
      </div>

      <div className={styles.orders}>
        {children}
      </div>
    </section>
  );
};

export default OrderSection;