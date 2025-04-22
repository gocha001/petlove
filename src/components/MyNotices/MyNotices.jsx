import css from "./MyNotices.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectViewed } from "../../redux/auth/authSelectors";
import { favoritesDelete } from "../../redux/notices/noticesOperations";
import NoticesItem from "../NoticesItem/NoticesItem";

const MyNotices = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("favorites");
  const favorites = useSelector(selectFavorites);
  const viewed = useSelector(selectViewed);

  const handleDeleteFavorite = async (id) => {
    try {
      await dispatch(favoritesDelete(id)).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const currentList = activeTab === "favorites" ? favorites : viewed;

  return (
    <div className={css.myNotices}>
      <div className={css.tabs}>
        <button
          className={activeTab === "favorites" ? css.activeTab : css.tab}
          onClick={() => setActiveTab("favorites")}
        >
          My favorite pets
        </button>{" "}
        <button
          className={activeTab === "viewed" ? css.activeTab : css.tab}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>
      <div className={css.myNoticesList}>
        <ul className={css.list}>
          {currentList.length === 0 ? (
            <li className={css.empty}>
              Oops,{" "}
              <span className={css.emptySpan}>
                looks like there aren't any furries
              </span>{" "}
              on our adorable page yet. Do not worry! View your pets on the
              "find your favorite pet" page and add them to your favorites.
            </li>
          ) : (
            currentList.map((item) => {
              return (
                <li key={item._id}>
                  <NoticesItem
                    notice={item}
                    isFavorite={activeTab === "favorites"}
                    isProfile={true}
                  />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyNotices;
