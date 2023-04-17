import React, { useState, useEffect } from "react";
import s from "./ScrollToTopButton.module.scss";
import { ReactComponent as UpArrow } from "../../assets/svg/up-arrow.svg";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(true); // Поменять на false!!!

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={s.topButton}
      style={{ display: isVisible ? 'flex' : 'none' }}
      onClick={handleClick}
    >
      <UpArrow />
    </div>
  );
};

export default ScrollToTopButton;
