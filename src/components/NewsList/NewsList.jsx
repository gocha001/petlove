import css from "./NewsList.module.css";
import NewsItem from "../NewsItem/NewsItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectNews, selectSearch } from "../../redux/news/newsSelectors";
import { useEffect } from "react";
import { fetchNews } from "../../redux/news/newsOperations.js";
import { resetNews } from "../../redux/news/newsSlice.js";

const NewsList = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const search = useSelector(selectSearch);
  console.log(news, search);

  useEffect(() => {
    dispatch(resetNews());
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className={css.newsList}>
      <ul className={css.newsListContainer}>
        {news.map((item) => {
          return (
            <li key={item._id} className={css.newsListItem}>
              <NewsItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewsList;
