import css from "./ModalApproveAction.module.css";
import cat1 from "../../assets/pets/cat-1.png";
import cat2 from "../../assets/pets/cat-2.png";
import { logout } from "../../redux/auth/authOperations.js";
import { useDispatch } from "react-redux";

const ModalApproveAction = ({ closeModal }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };
  return (
    <div className={css.modalApproveAction}>
      <button type="button" onClick={closeModal} className={css.closeBtn}>
        <svg className={css.closeBtnIcon} fill="none" stroke="black">
          <use href="/icons/icons.svg#icon-x" />
        </svg>
      </button>
      <picture className={css.image}>
        <source srcSet={`${cat1} 1x, ${cat2} 2x`} />
        <img src={`${cat1}`} alt="Cat" className={css.img} />
      </picture>
      <h4 className={css.modalApproveActionTitle}>Already leaving?</h4>
      <div className={css.modalApproveActionBtns}>
        <button type="button" onClick={onClick} className={css.logoutBtn}>
          Yes
        </button>
        <button type="button" onClick={closeModal} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalApproveAction;
