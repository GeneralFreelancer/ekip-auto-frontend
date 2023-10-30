import React from 'react';
import SideBar from './SideBar';
import Slider from './Slider/Slider';

import s from './SideBarSlider.module.scss';

const SideBarSlider = () => {
  return (
    <section>
      <div className={s.container__sidebar_slider}>
        <SideBar />
        <Slider />
      </div>
    </section>
  );
};

export default SideBarSlider;
