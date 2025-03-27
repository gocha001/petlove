import css from "./Title.module.css";
import { useLocation } from "react-router-dom";

const Title = () => {
  const location = useLocation();

  let titleContainer = css.titleContainer;

  if (location.pathname === "/login" || location.pathname === "/register") {
    titleContainer = css.titleContainerAuth;
  }

  return (
    <div className={titleContainer}>
      {location.pathname.startsWith("/news") && (
        <h2 className={css.titleText}>News</h2>
      )}
      {location.pathname.startsWith("/notices") && (
        <h2 className={css.titleText}>Find your favorite pet</h2>
      )}
      {location.pathname.startsWith("/friends") && (
        <h2 className={css.titleText}>Our friends</h2>
      )}
      {location.pathname.startsWith("/login") && (
        <h2 className={css.titleText}>Log in</h2>
      )}
      {location.pathname.startsWith("/register") && (
        <h2 className={css.titleText}>Registration</h2>
      )}
    </div>
  );
};

export default Title;
