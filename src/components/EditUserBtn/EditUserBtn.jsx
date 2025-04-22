import css from "./EditUserBtn.module.css";
import ModalEditUser from "../ModalEditUser/ModalEditUser";
import { useState, useEffect } from "react";
import useBodyScrollLock from "../../utils/useBodyScrollLock";

const EditUserBtn = ({ base }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  useBodyScrollLock(isOpenModal);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

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

  return (
    <>
      {base && (
        <div className={css.editUserBtn}>
          <div className={css.userCont}>
            <span className={css.user}>User</span>
            <svg className={css.userIcon}>
              <use href="/icons/user.svg#icon-user-02" />
            </svg>
          </div>
          <button type="button" onClick={openModal} className={css.editBtn}>
            <svg className={css.editBtnIcon}>
              <use
                className={css.normal}
                href="/icons/btns.svg#icon-editNormal"
              />
              <use
                className={css.hover}
                href="/icons/btns.svg#icon-editHover"
              />
            </svg>
          </button>
        </div>
      )}
      {!base && (
        <div className={css.editUserURL}>
          <button type="button" onClick={openModal} className={css.editBtnUrl}>
            <svg className={css.editBtnUrlIcon}>
              <use href="/icons/icons.svg#icon-icon" />
            </svg>
            <span className={css.editBtnUrlText}>Upload photo</span>
          </button>
        </div>
      )}
      {isOpenModal && (
        <div className={css.editModal} onClick={handleBackdropClick}>
          <ModalEditUser closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default EditUserBtn;
