import { ArrowRight, Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { useState } from "react";

import kitchenIllustration from "../../assets/ChatGPT Image Sep 21, 2026, 01_24_33 AM.png";
import { kitchenLoginStyles as styles } from "../../styles/Kitchen/KitchenLogin";
import { illustrationStyles } from "../../styles/auth";

const KitchenLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.page}>
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoDot} />
          <span>The Pass</span>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.illustrationSection}>
          <img
            src={kitchenIllustration}
            alt=""
            className={styles.illustration}
            style={illustrationStyles}
          />
        </div>

        <div className={styles.loginSection}>
          <p className={styles.kitchenLabel}>KITCHEN</p>

          <h1 className={styles.restaurantName}>Williams Bar</h1>

          <div className={styles.divider} />

          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="kitchenCode" className={styles.label}>
                Kitchen code
              </label>

              <div className={styles.inputWrapper}>
                <KeyRound size={19} className={styles.inputIcon} />

                <input
                  id="kitchenCode"
                  type="text"
                  placeholder="e.g. KITCHEN-1024"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>

              <div className={styles.inputWrapper}>
                <Lock size={19} className={styles.inputIcon} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={styles.input}
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.loginButton}>
              <span>Log in</span>
              <ArrowRight size={18} />
            </button>

            <button type="button" className={styles.forgotPassword}>
              Forgot password?
            </button>
          </form>
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