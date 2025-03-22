import { NavLink } from "react-router-dom";
import css from "./Nav.module.css";
import { useLocation } from "react-router-dom";

const Nav = ({ closeMenu }) => {
  const location = useLocation();

  let navLink = css.navLink;

  if (location.pathname === "/home") {
    navLink = css.homeNavLink;
  }

  return (
    <div className={css.nav}>
      <NavLink
        to="news"
        className={({ isActive }) =>
          isActive ? `${navLink} ${css.navActive}` : navLink
        }
        onClick={closeMenu}
      >
        News
      </NavLink>
      <NavLink
        to="notices"
        className={({ isActive }) =>
          isActive ? `${navLink} ${css.navActive}` : navLink
        }
        onClick={closeMenu}
      >
        Find pet
      </NavLink>
      <NavLink
        to="friends"
        className={({ isActive }) =>
          isActive ? `${navLink} ${css.navActive}` : navLink
        }
        onClick={closeMenu}
      >
        Our friends
      </NavLink>
    </div>
  );
};

export default Nav;
