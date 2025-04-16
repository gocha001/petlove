import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./SearchField.module.css";
import { useLocation } from "react-router-dom";

const searchSchema = yup.object().shape({
  query: yup.string().trim().max(100, "Maximum length 100 characters"),
});

const SearchField = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const queryValue = watch("query");

  const onSubmit = (data) => {
    onSearch(data.query);
  };

  const clearSearch = () => {
    reset();
    onSearch("");
  };

  const location = useLocation();

  let searchForm = css.searchForm;

  if (location.pathname === "/notices") {
    searchForm = css.searchFormNotice;
  }

  return (
    <div className={css.search}>
      <form onSubmit={handleSubmit(onSubmit)} className={searchForm}>
        <input
          type="text"
          placeholder="Search"
          {...register("query")}
          className={css.searchInput}
        />
        <div className={css.searchBtns}>
          {queryValue && (
            <button
              type="button"
              onClick={clearSearch}
              className={css.searchClearBtn}
            >
              <svg
                className={css.searchClearBtnIcon}
                fill="none"
                stroke="black"
              >
                <use href="/icons/icons.svg#icon-x" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={css.searchSubmitBtn}
          >
            <svg className={css.searchSubmitBtnIcon} fill="none" stroke="black">
              <use href="/icons/icons.svg#icon-search" />
            </svg>
          </button>
        </div>
      </form>
      <p className={css.error}>{errors.query?.message}</p>
    </div>
  );
};

export default SearchField;
