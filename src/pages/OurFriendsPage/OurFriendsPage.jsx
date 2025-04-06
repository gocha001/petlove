import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList";
import css from "./OurFriendsPage.module.css";
import { useSelector } from "react-redux";
import { selectError } from "../../redux/friends/friendsSelectors";

const OurFriendsPage = () => {
  const error = useSelector(selectError);

  if (error) return <div className={css.error}>Error: {error}</div>;

  return (
    <div className={css.friends}>
      <div className={css.friendsTitle}>
        <Title />
      </div>
      <FriendsList />
    </div>
  );
};

export default OurFriendsPage;
