import css from "./ModalEditUser.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  editUser,
  uploadImageToCloudinary,
} from "../../redux/auth/authOperations";
import { selectUser } from "../../redux/auth/authSelectors";
import { useFilledInput } from "../../utils/useFilledInput";

const editUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email is not valid"
    ),
  phone: yup.string().matches(/^\+38\d{10}$/, "Phone is not valid"),
  avatar: yup
    .string()
    .nullable()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Avatar is not valid"
    ),
});

const ModalEditUser = ({ closeModal }) => {
  const dispatch = useDispatch();
  const defaultValues = useSelector(selectUser);
  const [preview, setPreview] = useState(defaultValues?.avatar || null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues,
  });

  const avatarValue = watch("avatar");
  const nameValue = watch("name");
  const emailValue = watch("email");
  const phoneValue = watch("phone");

  const isAvatarFilled = useFilledInput(avatarValue);
  const isNameFilled = useFilledInput(nameValue);
  const isEmailFilled = useFilledInput(emailValue);
  const isPhoneFilled = useFilledInput(phoneValue);

  useEffect(() => {
    reset(defaultValues);
    setPreview(defaultValues?.avatar || null);
  }, [defaultValues, reset]);

  const handleFileChange = async (e) => {
    const newFile = e.target.files[0];
    if (!newFile) return;
    setLoading(true);

    try {
      const url = await uploadImageToCloudinary(newFile);
      setValue("avatar", url);
      setPreview(url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualChange = (e) => {
    setValue("avatar", e.target.value);
    setPreview(e.target.value);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      dispatch(editUser(data));
      closeModal();
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.modalEditUser}>
      <button type="button" onClick={closeModal} className={css.closeBtn}>
        <svg className={css.closeBtnIcon} fill="none" stroke="black">
          <use href="/icons/icons.svg#icon-x" />
        </svg>
      </button>
      <h4 className={css.editTitle}>Edit information</h4>
      <form onSubmit={handleSubmit(onSubmit)} className={css.editForm}>
        <div className={css.avatarWrap}>
          {preview ? (
            <img src={preview} alt="Avatar preview" className={css.avatar} />
          ) : (
            <svg className={css.defaultIcon}>
              <use href="/icons/icons.svg#icon-icon" />
            </svg>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={css.hiddenInput}
            id="avatarUpload"
          />
          <div className={css.btnBlock}>
            <input
              type="text"
              value={watch("avatar") || ""}
              {...register("avatar")}
              onChange={handleManualChange}
              onClick={(e) => e.stopPropagation()}
              className={`${css.url} ${isAvatarFilled && css.filled}`}
            />
            <label htmlFor="avatarUpload" className={css.uploadBtn}>
              <span>Upload photo</span>
              <svg className={css.uploadIcon}>
                <use href="/icons/editBtn.svg#icon-upload-cloud" />
              </svg>
            </label>
          </div>
          {errors.avatar && (
            <p className={css.errorAvatar}>{errors.avatar?.message}</p>
          )}
        </div>

        <div className={css.inputs}>
          <div className={css.inputGroup}>
            <input
              {...register("name")}
              placeholder="Name"
              className={`${css.input} ${isNameFilled && css.filled}`}
            />
            {errors.name && <p className={css.error}>{errors.name?.message}</p>}
          </div>
          <div className={css.inputGroup}>
            <input
              {...register("email")}
              placeholder="Email"
              className={`${css.input} ${isEmailFilled && css.filled}`}
            />
            {errors.email && (
              <p className={css.error}>{errors.email?.message}</p>
            )}
          </div>
          <div className={css.inputGroup}>
            <input
              {...register("phone")}
              placeholder="Phone"
              className={`${css.input} ${isPhoneFilled && css.filled}`}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone?.message}</p>
            )}
          </div>
        </div>
        <button type="submit" className={css.editBtn} disabled={loading}>
          Go to profile
        </button>
      </form>
    </div>
  );
};

export default ModalEditUser;
