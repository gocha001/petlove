import css from "./AddPetForm.module.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addPets,
  uploadImageToCloudinary,
} from "../../redux/auth/authOperations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, isValid } from "date-fns";
import { selectSpeciesList } from "../../redux/notices/noticesSelectors";
import { fetchSpecies } from "../../redux/notices/noticesOperations";
import { useFilledInput } from "../../utils/useFilledInput";

const addPetSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  imgURL: yup
    .string()
    .required("Url is required")
    .nullable()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Url is not valid"
    ),
  species: yup.string().required("Species is required"),
  birthday: yup
    .string()
    .required("Birthday must be valid and required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday is not valid"),
  sex: yup.string().required("Gender is required"),
});

const AddPetForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const speciesList = useSelector(selectSpeciesList);

  useEffect(() => {
    dispatch(fetchSpecies());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: { sex: null },
  });

  const sex = watch("sex");
  const imgURLValue = watch("imgURL");
  const titleValue = watch("title");
  const nameValue = watch("name");
  const birthdayValue = watch("birthday");
  const speciesValue = watch("species");

  const isImgURLFilled = useFilledInput(imgURLValue);
  const isTitleFilled = useFilledInput(titleValue);
  const isNameFilled = useFilledInput(nameValue);
  const isBirthdayFilled = useFilledInput(birthdayValue);
  const isSpeciesFilled = useFilledInput(speciesValue);

  const handleFileChange = async (e) => {
    const newFile = e.target.files[0];
    if (!newFile) return;
    setLoading(true);

    try {
      const url = await uploadImageToCloudinary(newFile);
      setValue("imgURL", url);
      setPreview(url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualChange = (e) => {
    setValue("imgURL", e.target.value);
    setPreview(e.target.value);
  };

  const [species, setSpecies] = useState("");

  const handleSelectType = (option) => {
    setSpecies(option);
    setValue("species", option);
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      dispatch(addPets(data));
      reset();
      setPreview("");
      setSpecies("");
      navigate("/profile");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    navigate("/profile");
  };

  return (
    <div className={css.addPet}>
      <div className={css.addPetFormTitleContainer}>
        <h2 className={css.addPetFormTitle}>Add my pet /</h2>
        <span className={css.addPetFormSpan}>Personal details</span>
      </div>

      <form className={css.addPetForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.addPetRadioBlock}>
          <div className={css.radioInputs}>
            <label className={css.radioLabel} htmlFor="female">
              <input
                {...register("sex")}
                id="female"
                type="radio"
                value="female"
                className={css.radioInput}
              />

              <svg className={css.radioIcon}>
                <use
                  href={`/icons/sex.svg#${
                    sex === "female" ? "icon-female-1" : "icon-female"
                  }`}
                />
              </svg>
            </label>

            <label className={css.radioLabel} htmlFor="male">
              <input
                {...register("sex")}
                id="male"
                type="radio"
                value="male"
                className={css.radioInput}
              />

              <svg className={css.radioIcon}>
                <use
                  href={`/icons/sex.svg#${
                    sex === "male" ? "icon-male-1" : "icon-male"
                  }`}
                />
              </svg>
            </label>

            <label className={css.radioLabel} htmlFor="multiple">
              <input
                {...register("sex")}
                id="multiple"
                type="radio"
                value="multiple"
                className={css.radioInput}
              />

              <svg className={css.radioIcon}>
                <use
                  href={`/icons/sex.svg#${
                    sex === "multiple" ? "icon-multiple-1" : "icon-multiple"
                  }`}
                />
              </svg>
            </label>
          </div>
          <p className={css.error}>{errors.sex?.message}</p>
        </div>

        <div className={css.petUrlWrap}>
          {preview ? (
            <img src={preview} alt="Pet photo" className={css.pet} />
          ) : (
            <svg className={css.defaultPet}>
              <use href="/icons/pet.svg#icon-image" />
            </svg>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="petUpload"
            className={css.urlInputHidden}
          />
          <div className={css.petUrlBtn}>
            <label htmlFor="petUpload" className={css.urlLabel}>
              <span>Upload photo</span>
              <svg className={css.uploadIcon}>
                <use href="/icons/editBtn.svg#icon-upload-cloud" />
              </svg>
            </label>
            <input
              type="text"
              value={watch("imgURL") || ""}
              {...register("imgURL")}
              placeholder="Enter URL"
              onChange={handleManualChange}
              onClick={(e) => e.stopPropagation()}
              className={`${css.urlInputChange} ${
                isImgURLFilled && css.filled
              }`}
            />{" "}
          </div>{" "}
          {errors.imgURL && (
            <p className={css.errorUrl}>{errors.imgURL?.message}</p>
          )}
        </div>

        <div className={css.addPetInfoCont}>
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              className={`${css.input} ${isTitleFilled && css.filled}`}
            />
            {errors.title && (
              <p className={css.error}>{errors.title?.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Pet’s Name"
              {...register("name")}
              className={`${css.input} ${isNameFilled && css.filled}`}
            />
            {errors.name && <p className={css.error}>{errors.name?.message}</p>}
          </div>

          <div className={css.addPetInfo}>
            <div className={css.addPetBirthdayCont}>
              <div className={css.addPetBirthday}>
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="00.00.0000"
                      dateFormat="dd.MM.yyyy"
                      selected={
                        field.value &&
                        isValid(parse(field.value, "yyyy-MM-dd", new Date()))
                          ? parse(field.value, "yyyy-MM-dd", new Date())
                          : null
                      }
                      onChange={(date) => {
                        if (!date) return field.onChange("");
                        const formatted = format(date, "yyyy-MM-dd");
                        field.onChange(formatted);
                      }}
                      onBlur={field.onBlur}
                      className={`${css.inputDate} ${
                        isBirthdayFilled && css.filled
                      }`}
                      maxDate={new Date()}
                    />
                  )}
                />
                <svg className={css.iconCalendar}>
                  <use href="/icons/icons.svg#icon-calendar" />
                </svg>
              </div>
              {errors.birthday && (
                <p className={css.errorBirthday}>{errors.birthday?.message}</p>
              )}
            </div>

            <div className={css.typeContainer}>
              <input
                readOnly
                className={`${css.species} ${isSpeciesFilled && css.filled}`}
                type="text"
                placeholder="Type of pet"
                value={species}
                {...register("species")}
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div className={css.typeOptionContainer}>
                  <ul className={css.options}>
                    {speciesList.map((species, index) => (
                      <li key={index} onClick={() => handleSelectType(species)}>
                        {species}
                      </li>
                    ))}
                  </ul>
                </div>
              )}{" "}
              {errors.species && !isSpeciesFilled && (
                <p className={css.error}>{errors.species?.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className={css.addPetBtns}>
          <button type="button" className={css.addPetBack} onClick={back}>
            Back
          </button>

          <button type="submit" className={css.addPetBtn} disabled={loading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
