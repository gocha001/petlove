import { Link } from "react-router-dom";
import css from "./PetsBlock.module.css";
import PetsList from "../PetsList/PetsList";

const PetsBlock = () => {
  return (
    <div className={css.petsBlock}>
      <div className={css.petsBlockTitleCont}>
        <h2 className={css.petsBlockTitle}>My pets</h2>
        <Link to="/add-pet" className={css.petsBlockLink}>
          <span className={css.petsBlockLinkText}>Add pet</span>
          <svg className={css.petsBlockLinkIcon}>
            <use href="/icons/iconPlus.svg#icon-plus" />
          </svg>
        </Link>
      </div>
      <PetsList />
    </div>
  );
};

export default PetsBlock;
