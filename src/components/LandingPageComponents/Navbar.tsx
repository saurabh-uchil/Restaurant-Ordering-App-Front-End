import { landingPageStyles as style } from "../../styles/landingPage";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
        <div className={style.logoContainer}>
          <div className={style.logoDot} />
          <span className={style.logoText}>The Pass</span>
        </div>

        <div className={style.navButtons}>
          <button className={style.loginButton}>Log in</button>

          <button className={style.getStartedButton} onClick={()=>alert('Get Started!!')}>
            Get started
          </button>
        </div>
      </nav>
  )
}

export default Navbar
