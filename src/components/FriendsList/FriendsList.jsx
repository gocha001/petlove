import { useDispatch, useSelector } from "react-redux";
import css from "./FriendsList.module.css";
import {
  selectFriends,
  selectIsLoading,
} from "../../redux/friends/friendsSelectors";
import FriendsItem from "../FriendsItem/FriendsItem.jsx";
import { useEffect } from "react";
import { resetFriends } from "../../redux/friends/friendsSlice.js";
import { fetchFriends } from "../../redux/friends/friendsOperations.js";

const FriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(resetFriends());
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className={css.friendsList}>
      <ul className={css.friendsListContainer}>
        {Array.isArray(friends) &&
          friends.map((friend) => {
            return (
              <li key={friend._id} className={css.friendsListItem}>
                <FriendsItem friend={friend} />
              </li>
            );
          })}
        {friends.length === 0 && !isLoading && (
          <p className={css.notFound}>Nothing found for this query.</p>
        )}
      </ul>
    </div>
  );
};

export default FriendsList;
