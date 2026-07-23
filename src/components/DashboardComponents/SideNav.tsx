import { NavLink } from "react-router-dom";

import { sideNavStyles as style } from "../../styles/sidenav";
import { links, type NavLinkType } from "../../data/dashboardLinks";

const SideNav = () => {

  const navlinks = links.map(({ id, name, path, icon:Icon}: NavLinkType) => (
    <NavLink
      key={id}
      to={path}
      end={path === "/dashboard"}
      className={({ isActive }) =>
      `${style.link} ${isActive ? style.activeLink : style.inactiveLink}`}
    >
      <Icon size={18} />
      <span>{name}</span>
      
    </NavLink>
  ));

  return (
    <aside className={style.sidebar}>
      <nav className={style.nav}>
        {navlinks}
      </nav>
    </aside>
  );
};

export default SideNav;