import css from "./ProfilePage.module.css";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";
import { selectError } from "../../redux/auth/authSelectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fullUser } from "../../redux/auth/authOperations";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fullUser());
  }, [dispatch]);

  if (error) return <div className={css.error}>Error: {error}</div>;

  return (
    <div className={css.profilePage}>
      <UserCard />
      <MyNotices />
    </div>
  );
};

export default ProfilePage;
