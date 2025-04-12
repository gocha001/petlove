import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={css.login}>
      <div className={css.loginPetBlock}>
        <PetBlock />
      </div>
      <div className={css.loginContainer}>
        <div className={css.loginTitle}>
          <Title />
          <p className={css.loginText}>
            Welcome! Please enter your credentials to login to the platform:
          </p>
        </div>
        <div className={css.loginLoginForm}>
          <LoginForm />
        </div>
        <div className={css.loginLinkBlock}>
          <span className={css.loginLinkText}>Don't have an account?</span>
          <Link to="/register" className={css.loginLink}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
