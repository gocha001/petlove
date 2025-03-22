import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import css from "./Loader.module.css";
import { useMediaQuery } from "react-responsive";
import mainD1 from "../../assets/main/main-d-1.png";
import mainD2 from "../../assets/main/main-d-2.png";
import mainT1 from "../../assets/main/main-t-1.png";
import mainT2 from "../../assets/main/main-t-2.png";
import mainM1 from "../../assets/main/main-m-1.png";
import mainM2 from "../../assets/main/main-m-2.png";
const Loader = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.loader}>
      <picture className={css.loaderPicture}>
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
        <img src={`${mainM1}`} alt="Dog" className={css.loaderImg} />
      </picture>
      <div className={css.loaderContainer}>
        <div className={css.loaderWrapper}>
          {isMobile && (
            <ClipLoader size={270} color="white" loading={progress < 100} />
          )}
          {!isMobile && (
            <ClipLoader size={396} color="white" loading={progress < 100} />
          )}
          <p className={css.loaderPercentage}>{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
