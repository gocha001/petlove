import css from "./NewsItem.module.css";
import { formatDate } from "../../utils/formatDate";

const NewsItem = ({ item }) => {
  return (
    <div className={css.newsItem}>
      <img src={item.imgUrl} className={css.newsItemImg} />
      <div className={css.newsItemContainer}>
        <div className={css.newsItemContent}>
          <h3 className={css.newsItemTitle}>{item.title}</h3>
          <p className={css.newsItemText}>{item.text}</p>
        </div>
        <div className={css.newsItemInfo}>
          <p className={css.newsItemDate}>{formatDate(item.date)}</p>
          <a className={css.newsItemLink} href={item.url} target="_blank">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
