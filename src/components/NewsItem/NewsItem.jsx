import css from "./NewsItem.module.css";

const NewsItem = ({ item }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

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
