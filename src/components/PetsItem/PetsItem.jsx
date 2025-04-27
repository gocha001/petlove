import css from "./PetsItem.module.css";
import { formatDate } from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import { deletePets } from "../../redux/auth/authOperations";

const PetsItem = ({ pet }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deletePets(pet._id));
  };

  return (
    <div className={css.petItem}>
      <img src={pet.imgURL} className={css.petImg} />
      <div className={css.petItemContainer}>
        <h3 className={css.petItemTitle}>{pet.title}</h3>
        <div className={css.petItemInfo}>
          <div className={css.petItemBlock}>
            <h4 className={css.petItemKey}>Name</h4>
            <p className={css.petItemValue}>{pet.name}</p>
          </div>
          <div className={css.petItemBlock}>
            <h4 className={css.petItemKey}>Birthday</h4>
            <p className={css.petItemValue}>{formatDate(pet.birthday)}</p>
          </div>
          <div className={css.petItemBlock}>
            <h4 className={css.petItemKey}>Sex</h4>
            <p className={css.petItemValue}>{pet.sex}</p>
          </div>
          <div className={css.petItemBlock}>
            <h4 className={css.petItemKey}>Species</h4>
            <p className={css.petItemValue}>{pet.species}</p>
          </div>
        </div>
      </div>
      <button type="button" onClick={onClick} className={css.petItemBtn}>
        <svg className={css.petItemIcon}>
          <use
            href="/public/icons/btns.svg#icon-deleteNormal"
            className={css.normal}
          />
          <use
            href="/public/icons/btns.svg#icon-deleteHover"
            className={css.hover}
          />
        </svg>
      </button>
    </div>
  );
};

export default PetsItem;
