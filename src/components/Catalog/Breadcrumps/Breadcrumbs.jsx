import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import s from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  // const parts = pathname.split("/").filter(Boolean);

  const parts = ["category", "subcategory", "id"]; // mocked

  const BREADCRUMB_TEXTS = {
    category: "Категорія",
    subcategory: "Підкатегорія",
    id: "0000000",
  };

  return (
    <div className={s.breadcrumbs_block}>
      {parts.length > 0 && (
        <React.Fragment key={0}>
          <div className={s.breadcrumbs_item}>
            <Link to="/">Головна</Link>
          </div>
          <div>{" > "}</div>
        </React.Fragment>
      )}
      {parts.map((part, index) => (
        <React.Fragment key={part}>
          <div
            className={`${s.breadcrumbs_item} ${
              index === parts.length - 1 ? s.last_crumb : ""
            }`}
          >
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