
import { Menu } from "lucide-react";
import { navbarStyles as style } from "../../styles/dashboardNavbar";
import type { userState } from "../../store/authStore";

type NavbarProp = {
  toggle: () => void,
  currentUser: userState
}

const Navbar = ({toggle, currentUser}:NavbarProp) => {

  const getInitials = (username:string) =>{
    const nameArray = username.split(' ');
    const upperCased = nameArray.map((word)=> word.charAt(0).toUpperCase());
    const initials = upperCased[0].charAt(0)+ upperCased[1].charAt(0);
    return initials;
  }

  const getDate = () =>{
    const date = new Date();
      const today = date.toLocaleDateString("en-AU", {
        day: "numeric",    
        month: "long",
        year: "numeric"
      });
      
      const day = date.toLocaleDateString("en-AU", {
        weekday: "long"
      });

      const dateString = day+", "+today;
      
      return dateString;
  }

  return (
    <nav className={style.navbar}>

      <div className={style.leftSection}>
        <button onClick={toggle} className={style.menuIcon}><Menu/></button>
        <div className={style.logoDot} />
        <span className={style.logo}>The Pass</span>
      </div>

      <div className={style.rightSection}>
        <div className={style.date}>{getDate()}</div>
        <div className={style.avatar}>{getInitials(currentUser?.username)}</div>
      </div>
      
    </nav>
  );
};

export default Navbar;