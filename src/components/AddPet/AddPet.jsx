import css from "./AddPet.module.css";
import { Link } from "react-router-dom";

const AddPet = () => {
  return (
    <div>
      <Link to="/add-pet" className={css.addPetLink}>
        <span>Add pet</span>
        <svg className={css.addPetLinkIcon}>
          <use href="/icons/iconPlus.svg#icon-plus" />
        </svg>
      </Link>
    </div>
  );
};

export default AddPet;
