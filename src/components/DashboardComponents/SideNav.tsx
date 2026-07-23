import { NavLink } from "react-router-dom";

import { sideNavStyles as style } from "../../styles/sidenav";
import { links, type NavLinkType } from "../../data/dashboardLinks";
import { LogOut } from "lucide-react";

type SideNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SideNav = ({isOpen, onClose}: SideNavProps) => {

  const navlinks = links.map(({ id, name, path, icon:Icon}: NavLinkType) => (
    <NavLink
      key={id}
      to={path}
      end={path === "/dashboard"}
      onClick={onClose}
      className={({ isActive }) =>
      `${style.link} ${
      isActive ? style.activeLink : style.inactiveLink}`
      }>
          <Icon size={18} />
          <span>{name}</span>

      </NavLink>
  ));

  return (
    <>
      {isOpen && (
        <button type="button" onClick={onClose} className={style.overlay}/>
      )}

      <aside className={`${style.container} ${isOpen ? style.open : style.closed}`}>
        
        <nav className={style.nav}>
          {navlinks}
        </nav>

        <button className={style.logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </aside>
    </>
  );
};

export default SideNav;