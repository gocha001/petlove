import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authOperations.js";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../redux/auth/authSelectors.js";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email is not valid"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Minimum 7 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (values) => {
    dispatch(login(values));
    reset();
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token]);

  const handleTogglePassword = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart;

      setShowPassword((prev) => !prev);

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(position, position);
      }, 0);
    }
  };

  return (
    <div>
      <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.loginContainer}>
          <div className={css.loginContainerBlock}>
            <input
              className={css.loginInput}
              type="email"
              {...register("email")}
              placeholder="Email"
            />
            {errors && (
              <p className={`${errors.email ? css.error : ""}`}>
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className={css.loginBlock}>
            <input
              className={css.loginInput}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              ref={(e) => {
                register("password").ref(e);
                inputRef.current = e;
              }}
            />
            <button
              type="button"
              className={css.password}
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <svg className={css.passwordIcon}>
                  <use href="/icons/icons.svg#icon-eye" />
                </svg>
              ) : (
                <svg className={css.passwordIcon}>
                  <use href="/icons/icons.svg#icon-eye-off" />
                </svg>
              )}
            </button>
            {errors && (
              <p className={`${errors.password ? css.error : ""}`}>
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>
        <button className={css.loginBtn} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
