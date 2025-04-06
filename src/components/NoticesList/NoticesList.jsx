import { useDispatch, useSelector } from "react-redux";
import css from "./NoticesList.module.css";
import {
  selectIsLoading,
  selectNotices,
} from "../../redux/notices/noticesSelectors.js";
import { useEffect } from "react";
import { resetNotices } from "../../redux/notices/noticesSlice.js";
import {
  fetchCategories,
  fetchCities,
  fetchNotices,
  fetchSex,
  fetchSpecies,
} from "../../redux/notices/noticesOperations.js";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";

const NoticesList = () => {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(resetNotices());
    dispatch(fetchNotices());
    dispatch(fetchCategories());
    dispatch(fetchSex());
    dispatch(fetchSpecies());
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <div className={css.noticesList}>
      <ul className={css.noticesListContainer}>
        {Array.isArray(notices) &&
          notices.map((notice) => {
            return (
              <li key={notice._id} className={css.noticesListItem}>
                <NoticesItem notice={notice} />
              </li>
            );
          })}
        {notices.length === 0 && !isLoading && (
          <p className={css.notFound}>Nothing found for this query.</p>
        )}
      </ul>
    </div>
  );
};

export default NoticesList;
