import SearchField from "../../components/SearchField/SearchField.jsx";
import Title from "../../components/Title/Title.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import css from "./NewsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  resetNews,
  searchNews,
} from "../../redux/news/newsSlice.js";
import { fetchNews } from "../../redux/news/newsOperations.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
  selectPage,
  selectTotalPages,
} from "../../redux/news/newsSelectors.js";

const NewsPage = () => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();

  const onSearch = async (data) => {
    dispatch(resetNews());
    dispatch(searchNews(data));
    console.log(data);
    dispatch(fetchNews());
  };

  const onPageChange = async (data) => {
    dispatch(changePage(data));
    dispatch(fetchNews());
  };

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
