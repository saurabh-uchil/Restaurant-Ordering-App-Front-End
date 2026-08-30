import { NavLink } from "react-router-dom";

import { sideNavStyles as style } from "../../styles/sidenav";
import { LogOut } from "lucide-react";
import type { NavLinkType } from "../../data/dashboardLinks";

type SideNavProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLinkType[];
  exactPath? : string;
  onLogout? : ()=> void;
};

const SideNav = ({isOpen, onClose, links, exactPath, onLogout}: SideNavProps) => {

  const navlinks = links.map(({ id, name, path, icon:Icon}: NavLinkType) => (
    <NavLink
      key={id}
      to={path}
      end={path === exactPath}
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

        <button className={style.logout} onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </aside>
    </>
  );
};

export default SideNav;