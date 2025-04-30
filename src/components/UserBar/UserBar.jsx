import { NavLink } from "react-router-dom";
import css from "./UserBar.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";
import { useMediaQuery } from "react-responsive";

const UserBar = () => {
  const user = useSelector(selectUser);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={css.userBar}>
      <NavLink to="/profile" className={css.userBarLink}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User avatar"
            className={css.userBarAvatar}
          />
        ) : (
          <svg className={css.userBarIcon}>
            <use href="/icons/icons.svg#icon-icon" />
          </svg>
        )}
        {!isMobile && <h2 className={css.userBarName}>{user.name}</h2>}
      </NavLink>
    </div>
  );
};

export default UserBar;
