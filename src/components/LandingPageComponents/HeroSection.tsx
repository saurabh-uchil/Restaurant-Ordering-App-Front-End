import { useNavigate } from "react-router";
import { landingPageStyles as style } from "../../styles/landingPage";

const HeroSection = () => {
   
  const navigate = useNavigate();  
    
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
            Manage menus, receive orders in real time, and keep your front-of-house and kitchen in sync with seamless, real-time order management.
        </p>

        <button className={style.heroButton} onClick={()=>navigate('/getStarted')}>
            Set up your restaurant
        </button>
    </div>
  )
}

export default HeroSection
