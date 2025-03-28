import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList";
import css from "./OurFriendsPage.module.css";

const OurFriendsPage = () => {
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
