import css from "./NotFoundPage.module.css";
import notFoundD1 from "../../assets/notFound/notFound-d-1.png";
import notFoundD2 from "../../assets/notFound/notFound-d-2.png";
import notFoundT1 from "../../assets/notFound/notFound-t-1.png";
import notFoundT2 from "../../assets/notFound/notFound-t-2.png";
import notFoundM1 from "../../assets/notFound/notFound-m-1.png";
import notFoundM2 from "../../assets/notFound/notFound-m-2.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={css.notFound}>
      <picture className={css.notFoundPicture}>
        <source
          srcSet={`${notFoundM1} 1x, ${notFoundM2} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${notFoundT1} 1x, ${notFoundT2} 2x`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`${notFoundD1} 1x, ${notFoundD2} 2x`}
          media="(min-width: 1280px)"
        />
        <img src={`${notFoundM1}`} alt="NotFound" className={css.notFoundImg} />
      </picture>
      <div className={css.notFoundContent}>
        <p className={css.notFoundText}>Ooops! This page not found :(</p>
        <Link className={css.notFoundLink} to="/home">
          To home page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
