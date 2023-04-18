import React from "react";
import SideBar from "./SideBar";

import s from "./SideBarSlider.module.scss";
import Slider from "./Slider/Slider";

const SideBarSlider = () => {
  return (
    <div className={s.container}>
      <div>
        <SideBar />
      </div>
      <div>
        <Slider />
      </div>
    </div>
  );
};

export default SideBarSlider;
