import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import s from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  const BREADCRUMB_TEXTS = {
    catalog: "Kаталог",
    category: "Категорія",
    subcategory: "Підкатегорія",
    ":id": "0000000",
  };

  return (
    <div className={s.breadcrumbs_block}>
      {parts.map((part, index) => (
        <React.Fragment  key={part}>
          <div className={s.breadcrumbs_item}>
            <Link to={`/${parts.slice(0, index + 1).join("/")}`}>
              {BREADCRUMB_TEXTS[part]}
            </Link>
          </div>

          <div> {index !== parts.length - 1 && " > "}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
