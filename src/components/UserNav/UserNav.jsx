import css from "./UserNav.module.css";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";
import UserBar from "../UserBar/UserBar.jsx";
import { useMediaQuery } from "react-responsive";

const UserNav = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={css.userNav}>
      {!isMobile && <LogOutBtn common={true} />}
      <UserBar />
    </div>
  );
};

export default UserNav;
