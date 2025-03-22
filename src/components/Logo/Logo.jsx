import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import { useLocation } from "react-router-dom";

const Logo = () => {
  const location = useLocation();

  let logoLink;
  let logoText;
  let logoIcon;
  let logoIconId;

  if (location.pathname === "/home") {
    logoLink = css.homeLogoLink;
    logoText = css.homeLogoText;
    logoIcon = css.homeLogoIcon;
    logoIconId = "icon-heart-circle-1";
  } else if (location.pathname === "/") {
    logoLink = css.mainLogoLink;
    logoText = css.mainLogoText;
    logoIcon = css.mainLogoIcon;
    logoIconId = "icon-heart-circle";
  } else {
    logoLink = css.homeLogoLink;
    logoText = css.logoText;
    logoIcon = css.homeLogoIcon;
    logoIconId = "icon-heart-circle";
  }

  return (
    <div className={css.logo}>
      <Link to="home" className={logoLink}>
        <span className={logoText}>petl</span>
        <svg className={logoIcon}>
          <use href={`/icons/logo.svg#${logoIconId}`} />
        </svg>
        <span className={logoText}>ve</span>
      </Link>
    </div>
  );
};

export default Logo;
