import { ArrowRight, CircleHelp, Armchair, Utensils } from "lucide-react";
import { customerLandingPageStyles as styles } from "../../styles/CustomerPage/customerLandingPage";

const CustomerLandingPage = () => {
  const table = 2;
  const restaurant = "Sample Restaurant";
  const description =
    "Good food, great drinks and an even better experience. Let's get started.";

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <div className={styles.brand}>
            <span className={styles.logoMark} />
            <span className={styles.logoText}>The Pass</span>
          </div>

          <span className={styles.dineInLabel}>
            Dine-in ordering
          </span>
        </header>

        <main className={styles.content}>
          <section className={styles.intro}>
            <p className={styles.welcomeTag}>
              Welcome to
            </p>

            <h1 className={styles.restaurantName}>
              {restaurant}
            </h1>

            <div className={styles.accentLine} />

            <p className={styles.description}>
              {description}
            </p>
          </section>

          <section className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div>
                <p className={styles.tableLabel}>Your table</p>
                <p className={styles.tableNumber}>
                  Table {table}
                </p>
              </div>

              <div className={styles.tableIcon}>
                <Armchair size={20} />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.orderInfo}>
              <div className={styles.orderInfoIcon}>
                <Utensils size={18} />
              </div>

              <div>
                <p className={styles.orderInfoTitle}>
                  Dine-in ordering
                </p>

                <p className={styles.orderInfoText}>
                  Your order will be sent directly to the kitchen.
                </p>
              </div>
            </div>

            <button
              type="button"
              className={styles.beginButton}
            >
              <span>Begin Order</span>
              <ArrowRight size={17} />
            </button>

            <div className={styles.helpBox}>
              <div className={styles.helpIcon}>
                <CircleHelp size={16} />
              </div>

              <div>
                <p className={styles.helpTitle}>
                  Need help?
                </p>

                <p className={styles.helpText}>
                  Please ask one of our staff.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          Powered by{" "}
          <span className={styles.footerBrand}>
            The Pass
          </span>
        </footer>
      </div>
    </div>
  );
};

export default CustomerLandingPage;