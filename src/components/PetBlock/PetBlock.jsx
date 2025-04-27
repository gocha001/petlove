import css from "./PetBlock.module.css";
import registerM1 from "../../assets/register/register-m-1.png";
import registerM2 from "../../assets/register/register-m-2.png";
import registerT1 from "../../assets/register/register-t-1.png";
import registerT2 from "../../assets/register/register-t-2.png";
import registerD1 from "../../assets/register/register-d-1.png";
import registerD2 from "../../assets/register/register-d-2.png";
import loginM1 from "../../assets/login/login-m-1.png";
import loginM2 from "../../assets/login/login-m-2.png";
import loginT1 from "../../assets/login/login-t-1.png";
import loginT2 from "../../assets/login/login-t-2.png";
import loginD1 from "../../assets/login/login-d-1.png";
import loginD2 from "../../assets/login/login-d-2.png";
import cat1 from "../../assets/pets/cat-1.png";
import cat2 from "../../assets/pets/cat-2.png";
import dog1 from "../../assets/pets/dog-1.png";
import dog2 from "../../assets/pets/dog-2.png";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import addM1 from "../../assets/add/add-m-1.png";
import addM2 from "../../assets/add/add-m-2.png";
import addT1 from "../../assets/add/add-t-1.png";
import addT2 from "../../assets/add/add-t-2.png";
import addD1 from "../../assets/add/add-d-1.png";
import addD2 from "../../assets/add/add-d-2.png";

const PetBlock = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const location = useLocation();

  let imgM1 = registerM1;
  let imgM2 = registerM2;
  let imgT1 = registerT1;
  let imgT2 = registerT2;
  let imgD1 = registerD1;
  let imgD2 = registerD2;
  let alt = "Cat";
  let petBlockImg = css.petBlockImgRegister;
  let img1 = cat1;
  let img2 = cat2;
  let title = "Jack";
  let date = "18.10.2021";
  let text =
    "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.";

  if (location.pathname === "/login") {
    imgM1 = loginM1;
    imgM2 = loginM2;
    imgT1 = loginT1;
    imgT2 = loginT2;
    imgD1 = loginD1;
    imgD2 = loginD2;
    alt = "Dog";
    petBlockImg = css.petBlockImgLogin;
    img1 = dog1;
    img2 = dog2;
    title = "Rich";
    date = "21.09.2020";
    text =
      "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!";
  }

  let isAddPet = false;

  if (location.pathname === "/add-pet") {
    imgM1 = addM1;
    imgM2 = addM2;
    imgT1 = addT1;
    imgT2 = addT2;
    imgD1 = addD1;
    imgD2 = addD2;
    isAddPet = true;
  }

  return (
    <div className={`${css.petBlock} ${isAddPet && css.petBlockAddPet}`}>
      <picture
        className={`${css.petBlockPicture} ${
          isAddPet && css.petBlockPictureAddPet
        }`}
      >
        <source
          srcSet={`${imgM1} 1x, ${imgM2} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${imgT1} 1x, ${imgT2} 2x`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`${imgD1} 1x, ${imgD2} 2x`}
          media="(min-width: 1280px)"
        />
        <img
          src={`${imgM1}`}
          alt={alt}
          className={`${petBlockImg} ${isAddPet && css.petBlockImgAddPet}`}
        />
      </picture>
      {!isMobile && location.pathname !== "/add-pet" && (
        <div
          className={`${css.petBlockContainer} ${css.petBlockContainerPosition}`}
        >
          <picture className={css.petBlockContainerPicture}>
            <source srcSet={`${img1} 1x, ${img2} 2x`} />
            <img
              src={`${img1}`}
              alt={alt}
              className={css.petBlockContainerImg}
            />
          </picture>
          <div className={css.petBlockContent}>
            <div className={css.petBlockTitleContainer}>
              <h4 className={css.petBlockTitle}>{title}</h4>
              <div className={css.petBlockTitleContent}>
                <span className={css.petBlockBirthday}>Birthday: </span>
                <span className={css.PetBlockDate}>{date}</span>
              </div>
            </div>
            <p className={css.petBlockText}>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetBlock;
