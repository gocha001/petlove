import css from "./HomePage.module.css";
import homeD1 from "../../assets/home/home-d-1.png";
import homeD2 from "../../assets/home/home-d-2.png";
import homeT1 from "../../assets/home/home-t-1.png";
import homeT2 from "../../assets/home/home-t-2.png";
import homeM1 from "../../assets/home/home-m-1.png";
import homeM2 from "../../assets/home/home-m-2.png";

const HomePage = () => {
  return (
    <div className={css.home}>
      <div className={css.homeContent}>
        <div className={css.homeBlock}>
          <h1 className={css.homeTitle}>
            Take good
            <span className={css.homeSpan}> care </span>
            of your small pets
          </h1>
          <p className={css.homeText}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </div>
      <picture className={css.homePicture}>
        <source
          srcSet={`${homeM1} 1x, ${homeM2} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${homeT1} 1x, ${homeT2} 2x`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`${homeD1} 1x, ${homeD2} 2x`}
          media="(min-width: 1280px)"
        />
        <img src={`${homeM1}`} alt="Girl with a dog" className={css.homeImg} />
      </picture>
    </div>
  );
};

export default HomePage;
