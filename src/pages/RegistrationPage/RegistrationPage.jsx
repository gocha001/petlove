import css from "./RegistrationPage.module.css";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import Title from "../../components/Title/Title.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  return (
    <div className={css.register}>
      <div className={css.registerPetBlock}>
        <PetBlock />
      </div>
      <div className={css.registerContainer}>
        <div className={css.registerTitle}>
          <Title />
          <p className={css.registerText}>
            Thank you for your interest in our platform.
          </p>
        </div>
        <div className={css.registerRegistrationForm}>
          <RegistrationForm />
        </div>
        <div className={css.registerLinkBlock}>
          <span className={css.registerLinkText}>Already have an account?</span>
          <Link to="/login" className={css.registerLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
