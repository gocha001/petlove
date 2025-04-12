import css from "./LogOutBtn.module.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction.jsx";

const LogOutBtn = () => {
  const location = useLocation();

  let logOutBtn = css.logOutBtn;

  if (location.pathname === "/home") {
    logOutBtn = css.logOutBtnHome;
  }

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
    <div>
      <button
        className={`${css.logOutBtnGeneral} ${logOutBtn}`}
        type="button"
        onClick={openModal}
      >
        Log out
      </button>
      {isOpenModal && (
        <div className={css.logOutModal} onClick={handleBackdropClick}>
          <ModalApproveAction closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default LogOutBtn;
