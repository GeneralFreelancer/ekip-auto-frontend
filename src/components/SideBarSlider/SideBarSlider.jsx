import React from "react";
import SideBar from "./SideBar";

import s from "./SideBarSlider.module.scss";
import Slider from "./Slider/Slider";



const SideBarSlider = () => {
  return (
    <section>
      <div className={s.container__sidebar_slider}>
          <SideBar/>
          <Slider />
      </div>
    </section>
  );
};

export default SideBarSlider;
