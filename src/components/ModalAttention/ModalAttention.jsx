import css from "./ModalAttention.module.css";
import dog1 from "../../assets/pets/dog-1.png";
import dog2 from "../../assets/pets/dog-2.png";
import { Link } from "react-router-dom";

const ModalAttention = ({ closeModal }) => {
  return (
    <div className={css.modalAttention}>
      <button type="button" onClick={closeModal} className={css.closeBtn}>
        <svg className={css.closeBtnIcon} fill="none" stroke="black">
          <use href="/icons/icons.svg#icon-x" />
        </svg>
      </button>
      <picture className={css.image}>
        <source srcSet={`${dog1} 1x, ${dog2} 2x`} />
        <img src={`${dog1}`} alt="Dog" className={css.img} />
      </picture>
      <div className={css.container}>
        <div className={css.content}>
          <h4 className={css.title}>Attention</h4>
          <p className={css.text}>
            We would like to remind you that certain functionality is available
            only to authorized users.If you have an account, please log in with
            your credentials. If you do not already have an account, you must
            register to access these features.
          </p>
        </div>
        <div className={css.btns}>
          <Link to="/login" className={css.linkLogin} onClick={closeModal}>
            Log In
          </Link>
          <Link
            to="/register"
            className={css.linkRegister}
            onClick={closeModal}
          >
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalAttention;
