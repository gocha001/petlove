import mainD1 from "../../assets/main/main-d-1.png";
import mainD2 from "../../assets/main/main-d-2.png";
import mainT1 from "../../assets/main/main-t-1.png";
import mainT2 from "../../assets/main/main-t-2.png";
import mainM1 from "../../assets/main/main-m-1.png";
import mainM2 from "../../assets/main/main-m-2.png";
import css from "./MainPage.module.css";
import Logo from "../../components/Logo/Logo";

const MainPage = () => {
  return (
    <div className={css.main}>
      <div className={css.mainLogo}>
        <Logo />
      </div>
      <picture className={css.mainPicture}>
        <source
          srcSet={`${mainM1} 1x, ${mainM2} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${mainT1} 1x, ${mainT2} 2x`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`${mainD1} 1x, ${mainD2} 2x`}
          media="(min-width: 1280px)"
        />
        <img src={`${mainM1}`} alt="Dog" className={css.mainImg} />
      </picture>
    </div>
  );
};

export default MainPage;
