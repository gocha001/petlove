import { useState, useEffect } from "react";
import css from "./NoticesItem.module.css";
import ModalNotice from "../ModalNotice/ModalNotice.jsx";
import ModalAttention from "../ModalAttention/ModalAttention.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../redux/auth/authSelectors";
import { selectFavoritesId } from "../../redux/notices/noticesSelectors.js";
import {
  fetchNoticesId,
  favoritesAdd,
  favoritesDelete,
} from "../../redux/notices/noticesOperations.js";
import useBodyScrollLock from "../../utils/useBodyScrollLock.js";
import { currentUser } from "../../redux/auth/authOperations.js";
import { useLocation } from "react-router-dom";
import { deleteNotice } from "../../redux/auth/authSlice.js";

const NoticesItem = ({ notice, isFavorite, isProfile }) => {
  const token = useSelector(selectToken);
  const favoritesId = useSelector(selectFavoritesId);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isOpenModal, setIsOpenModal] = useState(false);
  useBodyScrollLock(isOpenModal);
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

  const handleMore = () => {
    if (token) {
      dispatch(fetchNoticesId(notice._id));
    }
    openModal();
  };

  const [love, setLove] = useState(false);

  useEffect(() => {
    setLove(favoritesId.includes(notice._id));
  }, [favoritesId]);

  const isLove = async () => {
    if (token) {
      try {
        if (love === true) {
          await dispatch(favoritesDelete(notice._id)).unwrap();
        } else {
          await dispatch(favoritesAdd(notice._id)).unwrap();
        }
        setTimeout(() => {
          dispatch(currentUser());
        }, 300);
      } catch (error) {
        console.error(error);
      }
    } else {
      openModal();
    }
  };

  const deleteItem = async () => {
    try {
      await dispatch(favoritesDelete(notice._id)).unwrap();
      dispatch(deleteNotice(notice._id));
      setTimeout(() => {
        dispatch(currentUser());
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };

  let noticeLoveIcon = css.noticeLoveIcon;
  if (love) {
    noticeLoveIcon = css.noticeLoveIconLove;
  }

  let noticeOpenModal = css.noticeOpenModal;

  if (location.pathname === "/profile" && !isFavorite) {
    noticeOpenModal = css.noticeOpenModalViewed;
  }

  return (
    <div className={`${css.notice} ${isProfile && css.noticeProfile}`}>
      <img
        src={notice.imgURL}
        className={`${css.noticeImg} ${isProfile && css.noticeImgProfile}`}
      />
      <div
        className={`${css.noticeContainer} ${
          isProfile && css.noticeContainerProfile
        }`}
      >
        <div
          className={`${css.noticeContent} ${
            isProfile && css.noticeContentProfile
          }`}
        >
          <div
            className={`${css.noticeTitleData} ${
              isProfile && css.noticeTitleDataProfile
            }`}
          >
            <div
              className={`${css.noticeTitleReview} ${
                isProfile && css.noticeTitleReviewProfile
              }`}
            >
              <h3 className={css.noticeTitle}>{notice.title}</h3>
              <div className={css.noticeReview}>
                <svg className={css.noticeReviewIcon}>
                  <use href="/icons/icons.svg#icon-star" />
                </svg>
                <p className={css.noticeReviewNumber}>{notice.popularity}</p>
              </div>
            </div>
            <div
              className={`${css.noticeData} ${
                isProfile && css.noticeDataProfile
              }`}
            >
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
          <div
            className={`${css.noticeCommentCont} ${
              isProfile && css.noticeCommentContProfile
            }`}
          >
            <p className={css.noticeComment}>{notice.comment}</p>
          </div>
        </div>
        <div
          className={`${css.noticePriceBtns} ${
            isProfile && css.noticePriceBtnsProfile
          }`}
        >
          {notice.price ? (
            <p className={css.noticePrice}>${notice.price}</p>
          ) : (
            <p className={css.noticePrice}>Price not specified</p>
          )}
          <div
            className={`${css.noticeBtns} ${
              isProfile && css.noticeBtnsProfile
            }`}
          >
            <button
              type="button"
              onClick={handleMore}
              className={`${noticeOpenModal} ${
                isProfile && css.noticeOpenModalProfile
              }`}
            >
              Learn more
            </button>
            {location.pathname === "/notices" ? (
              <button type="button" onClick={isLove} className={css.noticeLove}>
                <svg className={noticeLoveIcon} fill="currentColor">
                  <use href="/icons/favorite.svg#icon-normal" />
                </svg>
              </button>
            ) : isFavorite ? (
              <button
                type="button"
                onClick={deleteItem}
                className={css.deleteItemBtn}
              >
                <svg className={css.deleteItemIcon}>
                  <use
                    href="/icons/btns.svg#icon-deleteNormal"
                    className={css.normal}
                  />
                  <use
                    href="/icons/btns.svg#icon-deleteHover"
                    className={css.hover}
                  />
                </svg>
              </button>
            ) : (
              ""
            )}
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
