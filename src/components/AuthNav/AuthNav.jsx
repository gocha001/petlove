import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import { useLocation } from "react-router-dom";

const AuthNav = ({ closeMenu }) => {
  const location = useLocation();

  let authNavLinkLogin = css.authNavLinkLogin;

  if (location.pathname === "/home") {
    authNavLinkLogin = css.authNavLinkLoginHome;
  }

  return (
    <div className={css.authNav}>
      <NavLink to="login" className={authNavLinkLogin} onClick={closeMenu}>
        Log In
      </NavLink>
      <NavLink
        to="register"
        className={css.authNavLinkRegister}
        onClick={closeMenu}
      >
        Registration
      </NavLink>
    </div>
  );
};

export default AuthNav;
