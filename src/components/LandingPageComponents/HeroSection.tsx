import { landingPageStyles as style } from "../../styles/landingPage";

const HeroSection = () => {
  return (
    <div className={style.heroSection}>
        <span className={style.heroTag}>
            For restaurants, by the pass
        </span>

        <h1 className={style.heroTitle}>
            Menu, kitchen, and table —
            <br />
            one order at a time.
        </h1>

        <p className={style.heroDescription}>
            Run your whole floor from one place. Customers scan and order, your
            kitchen sees it instantly, you manage the menu without lifting a pen.
        </p>

        <button className={style.heroButton}>
            Set up your restaurant
        </button>
    </div>
  )
}

export default HeroSection
