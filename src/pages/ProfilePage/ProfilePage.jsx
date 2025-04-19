import css from "./ProfilePage.module.css";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";
import { selectUser } from "../../redux/auth/authSelectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fullUser } from "../../redux/auth/authOperations";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fullUser());
  }, [dispatch]);

  return (
    <div>
      <UserCard />
      <MyNotices />
    </div>
  );
};

export default ProfilePage;
