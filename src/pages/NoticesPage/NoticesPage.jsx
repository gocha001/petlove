import { useDispatch, useSelector } from "react-redux";
import NoticesList from "../../components/NoticesList/NoticesList.jsx";
import Title from "../../components/Title/Title.jsx";
import css from "./NoticesPage.module.css";
import {
  selectError,
  selectPage,
  selectTotalPages,
} from "../../redux/notices/noticesSelectors.js";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters.jsx";
import Pagination from "../../components/Pagination/Pagination";
import { changePageNotices } from "../../redux/notices/noticesSlice";
import { fetchNotices } from "../../redux/notices/noticesOperations";

const NoticesPage = () => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const onPageChange = async (data) => {
    dispatch(changePageNotices(data));
    dispatch(fetchNotices());
  };

  if (error) return <div className={css.error}>Error: {error}</div>;

  return (
    <div className={css.notices}>
      <div className={css.noticesTitle}>
        <Title />
      </div>
      <div className={css.noticesFilters}>
        <NoticesFilters />
      </div>
      <div className={css.noticesList}>
        <NoticesList />
      </div>
      <div className={css.noticesPagination}>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default NoticesPage;
