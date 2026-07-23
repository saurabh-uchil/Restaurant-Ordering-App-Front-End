import { navbarStyles as style } from "../../styles/dashboardNavbar";

const Navbar = () => {
  return (
    <nav className={style.navbar}>

      <div className={style.leftSection}>
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