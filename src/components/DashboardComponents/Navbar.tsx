
import { Menu } from "lucide-react";
import { navbarStyles as style } from "../../styles/dashboardNavbar";

type NavbarProp = {
  toggle: () => void
}

const Navbar = ({toggle}:NavbarProp) => {
  return (
    <nav className={style.navbar}>

      <div className={style.leftSection}>
        <button onClick={toggle} className={style.menuIcon}><Menu/></button>
        <div className={style.logoDot} />
        <span className={style.logo}>The Pass</span>
      </div>

      <div className={style.rightSection}>
        <div className={style.avatar}>SU</div>
      </div>
      
    </nav>
  );
};

export default Navbar;