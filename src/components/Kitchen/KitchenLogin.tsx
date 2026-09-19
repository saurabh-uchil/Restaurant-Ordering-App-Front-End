import { ArrowLeft } from "lucide-react";

import { kitchenLoginStyles as styles } from "../../styles/Kitchen/KitchenLogin";

const KitchenLogin = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoDot} />
          <span>The Pass</span>
        </div>

        <button type="button" className={styles.backButton}>
          <ArrowLeft size={17} />
          <span>Back to restaurants</span>
        </button>
      </header>

      <section className={styles.content}>
        <div className={styles.branding}>
          <div className={styles.brandingContent}>
            <div className={styles.restaurantIcon}>
              <span>🍴</span>
            </div>

            <h1 className={styles.restaurantName}>Williams Bar</h1>

            <p className={styles.kitchenLabel}>KITCHEN LOGIN</p>

            <p className={styles.brandingDescription}>
              Sign in to manage your restaurant orders.
            </p>
          </div>

          <div className={styles.illustration}>
            {/* Kitchen illustration will be added next */}
          </div>
        </div>

        <div className={styles.loginSection}>
          {/* Login form will be added later */}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Powered by</span>

        <div className={styles.footerLogo}>
          <span className={styles.logoDot} />
          <span>The Pass</span>
        </div>
      </footer>
    </main>
  );
};

export default KitchenLogin;