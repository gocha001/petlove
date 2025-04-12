import Logo from "../Logo/Logo.jsx";
import Nav from "../Nav/Nav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import UserNav from "../UserNav/UserNav.jsx";
import { selectToken } from "../../redux/auth/authSelectors.js";
import { useSelector } from "react-redux";
import css from "./Header.module.css";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";

const Header = () => {
  const token = useSelector(selectToken);

  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const openMenu = () => setIsOpenMenu(true);
  const closeMenu = () => setIsOpenMenu(false);

  const location = useLocation();

  let stroke = "black";
  let strokeClose = "white";
  let headerMenuBackground = css.headerMenuBackground;
  let headerContainer = css.headerContainer;

  if (location.pathname === "/home") {
    stroke = "white";
    strokeClose = "black";
    headerMenuBackground = css.headerMenuBackgroundHome;
    headerContainer = css.headerContainerHome;
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu]);

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add(`${css.noScroll}`);
    } else {
      document.body.classList.remove(`${css.noScroll}`);
    }

    return () => {
      document.body.classList.remove(`${css.noScroll}`);
    };
  }, [isOpenMenu]);

  return (
    <div className={css.header}>
      <div className={headerContainer}>
        <div className={css.headerLogo}>
          <Logo />
        </div>
        {isDesktop && <Nav />}
        <div className={css.headerCont}>
          {!token && !isMobile && <AuthNav />}
          {token && <UserNav />}
          {!isDesktop && (
            <div className={css.headerMenu}>
              <button
                type="button"
                onClick={openMenu}
                className={css.headerMenuBtn}
              >
                <svg className={css.headerMenuIcon} fill="none" stroke={stroke}>
                  <use href="/icons/menu.svg#icon-menu-01" />
                </svg>
              </button>
            </div>
          )}
        </div>
        {isOpenMenu && (
          <div onClick={handleBackdropClick} className={css.headerWrapper}>
            <div
              className={`${css.headerMenuContent} ${headerMenuBackground} ${
                isOpenMenu ? css.headerOpenMenu : ""
              }`}
            >
              <button onClick={closeMenu} className={css.headerCloseBtn}>
                <svg
                  className={css.headerCloseBtnIcon}
                  fill="none"
                  stroke={strokeClose}
                >
                  <use href="/icons/icons.svg#icon-x" />
                </svg>
              </button>
              <Nav closeMenu={closeMenu} />
              <div className={css.headerMenuLog}>
                {!token && isMobile && <AuthNav closeMenu={closeMenu} />}
                {token && isMobile && <LogOutBtn />}
                {!isMobile && <div></div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
