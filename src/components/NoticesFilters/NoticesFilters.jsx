import { useDispatch, useSelector } from "react-redux";
import {
  filterNotices,
  resetNotices,
  searchNotices,
} from "../../redux/notices/noticesSlice";
import SearchField from "../SearchField/SearchField";
import css from "./NoticesFilters.module.css";
import { fetchNotices } from "../../redux/notices/noticesOperations";
import {
  selectCategoryList,
  selectLocationList,
  selectSexList,
  selectSpeciesList,
} from "../../redux/notices/noticesSelectors";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const noticesSchema = yup.object().shape({
  category: yup.string(),
  sex: yup.string(),
  species: yup.string(),
  location: yup.string().min(3, "Minimum length 3 characters"),
});

const NoticesFilters = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector(selectCategoryList);
  const sexList = useSelector(selectSexList);
  const speciesList = useSelector(selectSpeciesList);
  const locationList = useSelector(selectLocationList);

  const { handleSubmit } = useForm({
    resolver: yupResolver(noticesSchema),
  });

  const [filters, setFilters] = useState({
    category: "",
    sex: "",
    species: "",
    location: "",
    price: null,
    popularity: null,
  });

  useEffect(() => {
    dispatch(filterNotices(filters));
    dispatch(fetchNotices());
  }, [filters, dispatch]);

  const onSearch = async (data) => {
    dispatch(resetNotices());
    dispatch(searchNotices(data));
    dispatch(fetchNotices());
  };

  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenSex, setIsOpenSex] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);

  const handleSelectCategory = (option) => {
    setFilters((prev) => ({ ...prev, category: option }));
    setIsOpenCategory(false);
  };

  const handleSelectSex = (option) => {
    setFilters((prev) => ({ ...prev, sex: option }));
    setIsOpenSex(false);
  };

  const handleSelectType = (option) => {
    setFilters((prev) => ({ ...prev, species: option }));
    setIsOpenType(false);
  };

  const [location, setLocation] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length >= 3) {
      const filtered = locationList.filter(
        (opt) =>
          opt.cityEn.toLowerCase().includes(value.toLowerCase()) ||
          opt.countyEn.toLowerCase().includes(value.toLowerCase()) ||
          opt.stateEn.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (option) => {
    setLocation(option.cityEn);
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleSearch = (e) => {
    if (selectedOption) {
      setFilters((prev) => ({ ...prev, location: selectedOption._id }));
    }
  };

  const handleClear = () => {
    setLocation("");
    setFilters((prev) => ({ ...prev, location: "" }));
    setSelectedOption(null);
    setShowOptions(false);
  };

  const [selectPopular, setSelectPopular] = useState(false);
  const [selectUnpopular, setSelectUnpopular] = useState(false);
  const [selectCheap, setSelectCheap] = useState(false);
  const [selectExpensive, setSelectExpensive] = useState(false);

  const handleClickPopular = () => {
    setSelectPopular(true);
    setSelectUnpopular(false);
  };

  const handleClickUnpopular = () => {
    setSelectUnpopular(true);
    setSelectPopular(false);
  };

  const handleClickCheap = () => {
    setSelectCheap(true);
    setSelectExpensive(false);
  };

  const handleClickExpensive = () => {
    setSelectExpensive(true);
    setSelectCheap(false);
  };

  const handleClearPopular = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectPopular(false);
    setFilters((prev) => ({ ...prev, popularity: null }));
  };

  const handleClearUnpopular = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectUnpopular(false);
    setFilters((prev) => ({ ...prev, popularity: null }));
  };

  const handleClearCheap = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectCheap(false);
    setFilters((prev) => ({ ...prev, price: null }));
  };

  const handleClearExpensive = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectExpensive(false);
    setFilters((prev) => ({ ...prev, price: null }));
  };

  return (
    <div className={css.noticesFilters}>
      <div className={css.searchField}>
        <SearchField onSearch={onSearch} />
      </div>
      <form className={css.form} onSubmit={handleSubmit(handleSearch)}>
        <div className={css.categorySex}>
          <div className={css.categoryContainer}>
            <input
              readOnly
              onClick={() => setIsOpenCategory(!isOpenCategory)}
              className={`${css.category} ${css.select}`}
              placeholder="Category"
              value={filters.category}
            />
            {isOpenCategory && (
              <ul className={`${css.options} ${css.categoryOption}`}>
                <li
                  onClick={() => handleSelectCategory("")}
                  className={css.showAll}
                >
                  Show all
                </li>
                {categoryList.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={css.sexContainer}>
            <input
              readOnly
              onClick={() => setIsOpenSex(!isOpenSex)}
              className={`${css.sex} ${css.select}`}
              placeholder="By gender"
              value={filters.sex}
            />
            {isOpenSex && (
              <ul className={`${css.options} ${css.sexOption}`}>
                <li onClick={() => handleSelectSex("")} className={css.showAll}>
                  Show all
                </li>
                {sexList.map((sex, index) => (
                  <li key={index} onClick={() => handleSelectSex(sex)}>
                    {sex}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={css.typeLocation}>
          <div className={css.typeContainer}>
            <input
              readOnly
              onClick={() => setIsOpenType(!isOpenType)}
              className={`${css.type} ${css.select}`}
              placeholder="By type"
              value={filters.species}
            />
            {isOpenType && (
              <div className={css.typeOptionContainer}>
                <ul className={`${css.options} ${css.typeOption}`}>
                  <li
                    onClick={() => handleSelectType("")}
                    className={css.showAll}
                  >
                    Show all
                  </li>
                  {speciesList.map((species, index) => (
                    <li key={index} onClick={() => handleSelectType(species)}>
                      {species}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={css.locationContainer}>
            <div className={css.controller}>
              <input
                type="text"
                value={location}
                onChange={handleInputChange}
                className={css.location}
                placeholder="Location"
              />
              <div className={css.noticeBtns}>
                {location && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className={css.noticeClearBtn}
                  >
                    <svg
                      className={css.noticeClearBtnIcon}
                      fill="none"
                      stroke="black"
                    >
                      <use href="/icons/icons.svg#icon-x" />
                    </svg>
                  </button>
                )}
                <button type="submit" className={css.noticeSubmitBtn}>
                  <svg
                    className={css.noticeSubmitBtnIcon}
                    fill="none"
                    stroke="black"
                  >
                    <use href="/icons/icons.svg#icon-search" />
                  </svg>
                </button>
              </div>
            </div>
            {showOptions && filteredOptions.length > 0 && (
              <ul className={`${css.options} ${css.locationOption}`}>
                {filteredOptions.map((opt) => (
                  <li key={opt._id} onClick={() => handleOptionClick(opt)}>
                    {opt.cityEn}, {opt.countyEn}, {opt.stateEn}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <hr className={css.hr} />

        <div className={css.radioBlock}>
          <label
            className={`${css.popular} ${css.radioLabel} ${
              selectPopular ? css.active : ""
            }`}
            onClick={handleClickPopular}
          >
            <input
              className={css.radio}
              type="radio"
              name="popular"
              value={true}
              checked={filters.popularity === "true"}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, popularity: e.target.value }))
              }
            />
            Popular
            {selectPopular && (
              <button className={css.clearBtn} onClick={handleClearPopular}>
                <svg fill="none" stroke="white">
                  <use href="/icons/icons.svg#icon-x" />
                </svg>
              </button>
            )}
          </label>

          <label
            className={`${css.unpopular} ${css.radioLabel} ${
              selectUnpopular ? css.active : ""
            }`}
            onClick={handleClickUnpopular}
          >
            <input
              className={css.radio}
              type="radio"
              name="popular"
              value={false}
              checked={filters.popularity === "false"}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, popularity: e.target.value }))
              }
            />
            Unpopular
            {selectUnpopular && (
              <button className={css.clearBtn} onClick={handleClearUnpopular}>
                <svg fill="none" stroke="white">
                  <use href="/icons/icons.svg#icon-x" />
                </svg>
              </button>
            )}
          </label>

          <label
            className={`${css.cheap} ${css.radioLabel} ${
              selectCheap ? css.active : ""
            }`}
            onClick={handleClickCheap}
          >
            <input
              className={css.radio}
              type="radio"
              name="price"
              value={false}
              checked={filters.price === "false"}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            Cheap
            {selectCheap && (
              <button className={css.clearBtn} onClick={handleClearCheap}>
                <svg fill="none" stroke="white">
                  <use href="/icons/icons.svg#icon-x" />
                </svg>
              </button>
            )}
          </label>

          <label
            className={`${css.expensive} ${css.radioLabel} ${
              selectExpensive ? css.active : ""
            }`}
            onClick={handleClickExpensive}
          >
            <input
              className={css.radio}
              type="radio"
              name="price"
              value={true}
              checked={filters.price === "true"}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            Expensive
            {selectExpensive && (
              <button className={css.clearBtn} onClick={handleClearExpensive}>
                <svg fill="none" stroke="white">
                  <use href="/icons/icons.svg#icon-x" />
                </svg>
              </button>
            )}
          </label>
        </div>
      </form>
    </div>
  );
};

export default NoticesFilters;
