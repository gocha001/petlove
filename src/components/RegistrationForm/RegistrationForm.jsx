import css from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../redux/auth/authOperations.js";
import { useState, useRef, useEffect } from "react";
import { selectToken } from "../../redux/auth/authSelectors.js";

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
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
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

const isEmailValid = (email) =>
  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);

const isPasswordSecure = (password) =>
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[!@#$%^&*]/.test(password) &&
  password.length >= 7;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = (values) => {
    const { confirmPassword, ...dataToSend } = values;
    dispatch(registration(dataToSend));
    reset();
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token]);

  const password = watch("password");
  const [isSecure, setIsSecure] = useState(false);
  const confirmPassword = watch("confirmPassword");
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const email = watch("email");

  useEffect(() => {
    setIsSecure(isPasswordSecure(password));
  }, [password]);

  useEffect(() => {
    if (password === confirmPassword && password) {
      setIsConfirmPassword(true);
    } else {
      setIsConfirmPassword(false);
    }
  }, [confirmPassword]);

  const handleToggleVisibility = (ref, toggleFn) => {
    if (ref.current) {
      const position = ref.current.selectionStart;

      toggleFn((prev) => !prev);

      setTimeout(() => {
        ref.current?.focus();
        ref.current?.setSelectionRange(position, position);
      }, 0);
    }
  };

  return (
    <div>
      <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.registerContainer}>
          <div className={css.registerBlock}>
            <input
              type="text"
              className={`${css.registerInput} ${
                errors.name ? css.registerInputError : ""
              }`}
              {...register("name")}
              placeholder="Name"
            />

            <p className={`${errors.name ? css.error : ""}`}>
              {errors.name?.message}
            </p>
          </div>

          <div className={css.registerBlock}>
            <input
              className={`${css.registerInput} ${
                errors.email
                  ? css.registerInputError
                  : isEmailValid(email)
                  ? css.registerInputCheck
                  : ""
              }`}
              type="email"
              {...register("email")}
              placeholder="Email"
            />
            {isEmailValid(email) && (
              <svg className={css.checkIconEmail}>
                <use href="/icons/icons.svg#icon-check" />
              </svg>
            )}
            {errors.email && (
              <button
                type="button "
                onClick={() => setValue("email", "")}
                className={css.resetBtn}
              >
                <svg className={css.resetIcon}>
                  <use href="/icons/icons.svg#icon-x" />
                </svg>
              </button>
            )}
            <p className={`${errors.email ? css.error : ""}`}>
              {errors.email?.message}
            </p>
          </div>

          <div className={css.registerBlock}>
            <input
              className={`${css.registerInput} ${
                errors.password
                  ? css.registerInputError
                  : isSecure
                  ? css.registerInputCheck
                  : ""
              }`}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              ref={(e) => {
                register("password").ref(e);
                passwordRef.current = e;
              }}
            />
            {isSecure && (
              <svg className={css.checkIcon}>
                <use href="/icons/icons.svg#icon-check" />
              </svg>
            )}
            <button
              type="button"
              className={css.password}
              onClick={() =>
                handleToggleVisibility(passwordRef, setShowPassword)
              }
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
            {isSecure && <p className={css.checkText}>Password is secure</p>}
            {errors && (
              <p className={`${errors.password ? css.error : ""}`}>
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className={css.registerBlock}>
            <input
              className={`${css.registerInput} ${
                errors.confirmPassword
                  ? css.registerInputError
                  : isConfirmPassword
                  ? css.registerInputCheck
                  : ""
              }`}
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              ref={(e) => {
                register("confirmPassword").ref(e);
                confirmPasswordRef.current = e;
              }}
            />
            {isConfirmPassword && (
              <svg className={css.checkIcon}>
                <use href="/icons/icons.svg#icon-check" />
              </svg>
            )}
            <button
              type="button"
              className={css.password}
              onClick={() =>
                handleToggleVisibility(
                  confirmPasswordRef,
                  setShowConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <svg className={css.passwordIcon}>
                  <use href="/icons/icons.svg#icon-eye" />
                </svg>
              ) : (
                <svg className={css.passwordIcon}>
                  <use href="/public/icons/icons.svg#icon-eye-off" />
                </svg>
              )}
            </button>
            {errors && (
              <p className={`${errors.confirmPassword ? css.error : ""}`}>
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>

        <button className={css.registerBtn} type="submit">
          Registration
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
