import css from "./PetsList.module.css";
import { useSelector } from "react-redux";
import PetsItem from "../PetsItem/PetsItem.jsx";
import { selectPets } from "../../redux/auth/authSelectors.js";

const PetsList = () => {
  const pets = useSelector(selectPets);

  return (
    <div className={css.petsList}>
      <ul className={css.petsListContainer}>
        {Array.isArray(pets) &&
          pets.map((pet) => {
            return (
              <li key={pet._id} className={css.petsListItem}>
                <PetsItem pet={pet} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PetsList;
