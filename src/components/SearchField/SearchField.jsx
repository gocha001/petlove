import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./SearchField.module.css";

const searchSchema = yup.object().shape({
  query: yup.string().trim().max(100, "Maximum length 100 characters"),
});

const SearchField = ({ onSearch }) => {
  const { register, handleSubmit, reset, watch } = useForm({
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

  return (
    <div className={css.search}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.searchForm}>
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
          <button type="submit" className={css.searchSubmitBtn}>
            <svg className={css.searchSubmitBtnIcon} fill="none" stroke="black">
              <use href="/icons/icons.svg#icon-search" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchField;
