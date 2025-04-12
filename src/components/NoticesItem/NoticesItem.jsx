import { useState, useEffect } from "react";
import css from "./NoticesItem.module.css";
import ModalNotice from "../ModalNotice/ModalNotice.jsx";
import ModalAttention from "../ModalAttention/ModalAttention.jsx";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSelectors";

const NoticesItem = ({ notice }) => {
  const token = useSelector(selectToken);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const [love, setLove] = useState(false);
  const isLove = () => {
    if (love === true) {
      setLove(false);
    } else {
      setLove(true);
    }
  };

  let noticeLoveIcon = css.noticeLoveIcon;
  if (love) {
    noticeLoveIcon = css.noticeLoveIconLove;
  }

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "16px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0";
    }
  }, [isOpenModal]);

  return (
    <div className={css.notice}>
      <img src={notice.imgURL} className={css.noticeImg} />
      <div className={css.noticeContainer}>
        <div className={css.noticeContent}>
          <div className={css.noticeTitleData}>
            <div className={css.noticeTitleReview}>
              <h3 className={css.noticeTitle}>{notice.title}</h3>
              <div className={css.noticeReview}>
                <svg className={css.noticeReviewIcon}>
                  <use href="/icons/icons.svg#icon-star" />
                </svg>
                <p className={css.noticeReviewNumber}>{notice.popularity}</p>
              </div>
            </div>
            <div className={css.noticeData}>
              <div className={css.noticeParam}>
                <p className={css.noticeKey}>Name</p>
                <p className={css.noticeValue}>{notice.name}</p>
              </div>
              <div className={css.noticeParam}>
                <p className={css.noticeKey}>Birthday</p>
                <p className={css.noticeValue}>{notice.birthday}</p>
              </div>
              <div className={css.noticeParam}>
                <p className={css.noticeKey}>Sex</p>
                <p className={css.noticeValue}>{notice.sex}</p>
              </div>
              <div className={css.noticeParam}>
                <p className={css.noticeKey}>Species</p>
                <p className={css.noticeValue}>{notice.species}</p>
              </div>
              <div className={css.noticeParam}>
                <p className={css.noticeKey}>Category</p>
                <p className={css.noticeValue}>{notice.category}</p>
              </div>
            </div>
          </div>
          <div className={css.noticeCommentCont}>
            <p className={css.noticeComment}>{notice.comment}</p>
          </div>
        </div>
        <div className={css.noticePriceBtns}>
          {notice.price ? (
            <p className={css.noticePrice}>${notice.price}</p>
          ) : (
            <p className={css.noticePrice}>Price is negotiable</p>
          )}
          <div className={css.noticeBtns}>
            <button
              type="button"
              onClick={openModal}
              className={css.noticeOpenModal}
            >
              Learn more
            </button>
            <button type="button" onClick={isLove} className={css.noticeLove}>
              <svg className={noticeLoveIcon} fill="currentColor">
                <use href="/icons/favorite.svg#icon-normal" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <div onClick={handleBackdropClick} className={css.noticeWrapper}>
          {token && <ModalNotice closeModal={closeModal} />}
          {!token && <ModalAttention closeModal={closeModal} />}
        </div>
      )}
    </div>
  );
};

export default NoticesItem;
