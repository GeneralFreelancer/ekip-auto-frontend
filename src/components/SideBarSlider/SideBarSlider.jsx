import React from "react";
import SideBar from "./SideBar";

import s from "./SideBarSlider.module.scss";
import Slider from "./Slider/Slider";
import { useSelector } from "react-redux";
import { selectedAdvertisingDesktop } from "../../redux/features/advertisingSlice";

const SideBarSlider = () => {
  const images = useSelector(selectedAdvertisingDesktop);

  return (
    <section>
      <div className={s.container__sidebar_slider}>
        <SideBar />
        {images.length > 0 && <Slider />}
      </div>
    </section>
  );
};

export default SideBarSlider;
