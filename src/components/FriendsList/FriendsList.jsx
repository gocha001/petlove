import { useDispatch, useSelector } from "react-redux";
import css from "./FriendsList.module.css";
import { selectFriends } from "../../redux/friends/friendsSelectors";
import FriendsItem from "../FriendsItem/FriendsItem.jsx";
import { useEffect } from "react";
import { resetFriends } from "../../redux/friends/friendsSlice.js";
import { fetchFriends } from "../../redux/friends/friendsOperations.js";

const FriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(resetFriends());
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className={css.friendsList}>
      <ul className={css.friendsListContainer}>
        {friends.map((friend) => {
          return (
            <li key={friend._id} className={css.friendsListItem}>
              <FriendsItem friend={friend} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendsList;
