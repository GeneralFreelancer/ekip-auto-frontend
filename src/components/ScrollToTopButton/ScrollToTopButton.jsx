import React, { useState, useEffect } from "react";
import s from "./ScrollToTopButton.module.scss";
import { ReactComponent as UpArrow } from "../../assets/svg/up-arrow.svg";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  let mobileV = viewportWidth > 540;

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      {mobileV && (
        <div
          className={s.topButton}
          style={{ display: isVisible ? "flex" : "none" }}
          onClick={handleClick}
        >
          <UpArrow />
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
