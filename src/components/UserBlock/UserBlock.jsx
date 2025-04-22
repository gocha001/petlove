import EditUserBtn from "../EditUserBtn/EditUserBtn";
import css from "./UserBlock.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";

const UserBlock = () => {
  const user = useSelector(selectUser);

  return (
    <div className={css.userBlock}>
      {!user.avatar && <EditUserBtn base={false} />}
      {user.avatar && (
        <div className={css.userAvatarWrap}>
          <img src={user.avatar} alt="User avatar" className={css.userAvatar} />
        </div>
      )}
      <div className={css.userInfo}>
        <h2 className={css.userInfoTitle}>My information</h2>
        <div className={css.userInfoContent}>
          <div className={css.userInfoItem}>{user.name}</div>
          <div className={css.userInfoItem}>{user.email}</div>
          <div className={css.userInfoItem}>{user.phone || "+380"}</div>
        </div>
      </div>
    </div>
  );
};

export default UserBlock;
