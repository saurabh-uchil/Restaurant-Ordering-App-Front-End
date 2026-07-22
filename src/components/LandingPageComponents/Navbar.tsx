import { useNavigate } from "react-router";
import { landingPageStyles as style } from "../../styles/landingPage";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={style.navbar}>
        <div className={style.logoContainer}>
          <div className={style.logoDot} />
          <span className={style.logoText}>The Pass</span>
        </div>

        <div className={style.navButtons}>
          <button className={style.loginButton} onClick={()=>navigate('/login')}>Log in</button>

          <button className={style.getStartedButton} onClick={()=>navigate('/getStarted')}>
            Get started
          </button>
        </div>
      </nav>
  )
}

export default Navbar
