import SearchField from "../../components/SearchField/SearchField.jsx";
import Title from "../../components/Title/Title.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import css from "./NewsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changePageNews,
  resetNews,
  searchNews,
} from "../../redux/news/newsSlice.js";
import { fetchNews } from "../../redux/news/newsOperations.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
  selectError,
  selectPage,
  selectTotalPages,
} from "../../redux/news/newsSelectors.js";

const NewsPage = () => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const onSearch = async (data) => {
    dispatch(resetNews());
    dispatch(searchNews(data));
    dispatch(fetchNews());
  };

  const onPageChange = async (data) => {
    dispatch(changePageNews(data));
    dispatch(fetchNews());
  };

  if (error) return <div className={css.error}>Error: {error}</div>;

  return (
    <div className={css.newsPage}>
      <div className={css.newsContainer}>
        <Title />
        <SearchField onSearch={onSearch} />
      </div>
      <div className={css.newsList}>
        <NewsList />
      </div>
      <div className={css.newsPagination}>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default NewsPage;
