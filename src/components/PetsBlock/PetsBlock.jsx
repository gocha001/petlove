import css from "./PetsBlock.module.css";
import PetsList from "../PetsList/PetsList";
import AddPet from "../AddPet/AddPet";

const PetsBlock = () => {
  return (
    <div className={css.petsBlock}>
      <div className={css.petsBlockTitleCont}>
        <h2 className={css.petsBlockTitle}>My pets</h2>
        <AddPet />
      </div>
      <PetsList />
    </div>
  );
};

export default PetsBlock;
