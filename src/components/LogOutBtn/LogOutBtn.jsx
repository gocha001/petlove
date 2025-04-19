import css from "./LogOutBtn.module.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction.jsx";
import useBodyScrollLock from "../../utils/useBodyScrollLock.js";
import { useMediaQuery } from "react-responsive";

const LogOutBtn = ({ openModal, common }) => {
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  let logOutBtn = css.logOutBtn;

  if (location.pathname === "/home") {
    logOutBtn = css.logOutBtnHome;
  }

  const [isOpenModal, setIsOpenModal] = useState(false);
  useBodyScrollLock(isOpenModal);

  const modalOpen = () => setIsOpenModal(true);

  const modalClose = () => setIsOpenModal(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        modalClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalClose]);

  return (
    <div>
      <button
        className={`${css.logOutBtnGeneral} ${logOutBtn}`}
        type="button"
        onClick={() => {
          `${common && isMobile ? openModal() : modalOpen()}`;
        }}
      >
        Log out
      </button>
      {isOpenModal && (!isMobile || !common) && (
        <div className={css.logOutModal} onClick={handleBackdropClick}>
          <ModalApproveAction closeModal={modalClose} />
        </div>
      )}
    </div>
  );
};

export default LogOutBtn;
