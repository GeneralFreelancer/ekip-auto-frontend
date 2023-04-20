import React from "react";

import { Link } from "react-router-dom";
import s from "./Logo.module.scss";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <div className={s.logo}> </div>
      </Link>
    </div>
  );
};

export default Logo;
