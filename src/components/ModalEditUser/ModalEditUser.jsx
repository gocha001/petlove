import css from "./ModalEditUser.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { editUser } from "../../redux/auth/authOperations";
import { selectUser } from "../../redux/auth/authSelectors";
import { uploadImageToCloudinary } from "../../redux/auth/authOperations";

const editUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email"),
  phone: yup.string().matches(/^\+38\d{10}$/, "Invalid phone"),
  avatar: yup
    .string()
    // .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, "Invalid URL")
    .nullable(),
});

const ModalEditUser = ({ closeModal }) => {
  const dispatch = useDispatch();
  const defaultValues = useSelector(selectUser);
  const [preview, setPreview] = useState(defaultValues?.avatar || null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    setPreview(defaultValues?.avatar || null);
  }, [defaultValues, reset]);

  // const onFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFile(file);
  //     const previewUrl = URL.createObjectURL(file);
  //     setPreview(previewUrl);
  //     setValue("avatar", previewUrl);
  //   }
  // };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      setPreview(URL.createObjectURL(newFile));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let avatarUrl = defaultValues.avatar;

      if (file) {
        avatarUrl = await uploadImageToCloudinary(file);
      }
      console.log(avatarUrl);
      const updatedUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: avatarUrl,
      };

      dispatch(editUser(updatedUser));
    } catch (err) {
      console.error("Failed to submit:", err.message);
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
              <use href="/public/icons/icons.svg#icon-icon" />
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
            <div className={css.url}>{preview}</div>
            <label htmlFor="avatarUpload" className={css.uploadBtn}>
              <span>Upload photo</span>
              <svg className={css.uploadIcon}>
                <use href="/icons/editBtn.svg#icon-upload-cloud" />
              </svg>
            </label>
          </div>
        </div>

        <input {...register("name")} placeholder="Name" />
        <p className={css.error}>{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" />
        <p className={css.error}>{errors.email?.message}</p>

        <input {...register("phone")} placeholder="Phone" />
        <p className={css.error}>{errors.phone?.message}</p>

        <button type="submit">Go to profile</button>
      </form>
    </div>
  );
};

export default ModalEditUser;
