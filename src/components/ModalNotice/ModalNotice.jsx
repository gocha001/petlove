import css from "./ModalNotice.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectNoticeId } from "../../redux/notices/noticesSelectors";
import { formatDate } from "../../utils/formatDate";
import { useState, useEffect } from "react";
import { selectFavoritesId } from "../../redux/notices/noticesSelectors";
import {
  favoritesAdd,
  favoritesDelete,
} from "../../redux/notices/noticesOperations";
import { currentUser } from "../../redux/auth/authOperations";

const ModalNotice = ({ closeModal }) => {
  const notice = useSelector(selectNoticeId);
  const favoritesId = useSelector(selectFavoritesId);
  const dispatch = useDispatch();

  let star1 = css.star;
  let star2 = css.star;
  let star3 = css.star;
  let star4 = css.star;
  let star5 = css.star;

  if (notice.popularity > 0) {
    star1 = css.starLove;
  }
  if (notice.popularity > 1) {
    star2 = css.starLove;
  }
  if (notice.popularity > 2) {
    star3 = css.starLove;
  }
  if (notice.popularity > 3) {
    star4 = css.starLove;
  }
  if (notice.popularity > 4) {
    star5 = css.starLove;
  }

  const [love, setLove] = useState(false);

  useEffect(() => {
    setLove(favoritesId.includes(notice._id));
  }, [favoritesId]);

  const isLove = async () => {
    if (love === true) {
      await dispatch(favoritesDelete(notice._id)).unwrap();
    } else {
      await dispatch(favoritesAdd(notice._id)).unwrap();
    }
    setTimeout(() => {
      dispatch(currentUser());
    }, 300);
  };

  let loveIcon = css.loveIcon;
  if (love) {
    loveIcon = css.loveIconLove;
  }

  const [isContact, setIsContact] = useState(false);

  const openContact = () => {
    setIsContact(!isContact);
  };

  const closeContact = () => {
    setIsContact(false);
  };

  return (
    <div className={css.modalNotice}>
      <button type="button" onClick={closeModal} className={css.closeBtn}>
        <svg className={css.closeBtnIcon} fill="none" stroke="black">
          <use href="/icons/icons.svg#icon-x" />
        </svg>
      </button>
      <picture className={css.image}>
        <img src={notice.imgURL} alt="Pet" className={css.img} />
        <div className={css.category}>{notice.category}</div>
      </picture>
      <div className={css.titleReviews}>
        <h4 className={css.title}>{notice.title}</h4>
        <div className={css.reviews}>
          <svg className={star1}>
            <use href="/icons/icons.svg#icon-star" />
          </svg>
          <svg className={star2}>
            <use href="/icons/icons.svg#icon-star" />
          </svg>{" "}
          <svg className={star3}>
            <use href="/icons/icons.svg#icon-star" />
          </svg>
          <svg className={star4}>
            <use href="/icons/icons.svg#icon-star" />
          </svg>
          <svg className={star5}>
            <use href="/icons/icons.svg#icon-star" />
          </svg>
          <span className={css.reviews}>{notice.popularity}</span>
        </div>
      </div>
      <div className={css.data}>
        <div className={css.param}>
          <p className={css.key}>Name</p>
          <p className={css.value}>{notice.name}</p>
        </div>
        <div className={css.param}>
          <p className={css.key}>Birthday</p>
          <p className={css.value}>{formatDate(notice.birthday)}</p>
        </div>
        <div className={css.param}>
          <p className={css.key}>Sex</p>
          <p className={css.value}>{notice.sex}</p>
        </div>
        <div className={css.param}>
          <p className={css.key}>Species</p>
          <p className={css.value}>{notice.species}</p>
        </div>
      </div>
      <p className={css.comment}>{notice.comment}</p>
      {notice.price ? (
        <p className={css.price}>${notice.price}</p>
      ) : (
        <p className={css.price}>Price not specified</p>
      )}
      <div className={css.btns}>
        <button
          type="button"
          className={`${css.btn} ${css.btnLove}`}
          onClick={isLove}
        >
          {love ? <p>Remove</p> : <p>Add to</p>}
          <svg className={loveIcon} fill="currentColor">
            <use href="/icons/favorite.svg#icon-normal" />
          </svg>
        </button>
        <div className={css.contact}>
          <button
            type="button"
            className={`${css.btn} ${css.btnContact}`}
            onClick={openContact}
          >
            Contact
          </button>
          {isContact && (notice.user?.email || notice.user?.phone) && (
            <div className={css.contactList} onClick={closeContact}>
              {notice.user?.email && (
                <a
                  href={`mailto:${notice.user.email}`}
                  className={css.contactBtn}
                >
                  Email:{notice.user.email}
                </a>
              )}
              {notice.user?.phone && (
                <a href={`tel:${notice.user.phone}`} className={css.contactBtn}>
                  Tel:{notice.user.phone}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalNotice;
