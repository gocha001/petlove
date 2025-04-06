import css from "./NewsList.module.css";
import NewsItem from "../NewsItem/NewsItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectNews } from "../../redux/news/newsSelectors";
import { useEffect } from "react";
import { fetchNews } from "../../redux/news/newsOperations.js";
import { resetNews } from "../../redux/news/newsSlice.js";

const NewsList = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(resetNews());
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className={css.newsList}>
      <ul className={css.newsListContainer}>
        {Array.isArray(news) &&
          news.map((item) => {
            return (
              <li key={item._id} className={css.newsListItem}>
                <NewsItem item={item} />
              </li>
            );
          })}
        {news.length === 0 && !isLoading && (
          <p className={css.notFound}>Nothing found for this query.</p>
        )}
      </ul>
    </div>
  );
};

export default NewsList;
