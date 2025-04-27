import PetBlock from "../../components/PetBlock/PetBlock";
import css from "./AddPetPage.module.css";
import AddPetForm from "../../components/AddPetForm/AddPetForm.jsx";

const AddPetPage = () => {
  return (
    <div className={css.addPet}>
      <PetBlock />
      <AddPetForm />
    </div>
  );
};

export default AddPetPage;
