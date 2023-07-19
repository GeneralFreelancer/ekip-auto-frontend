import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Accordion.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { ReactComponent as ArrowDown } from "../../../../../assets/svg/up-arrow.svg";
import axios from "axios";
import {
  setCategoryProducts,
  setSubCategoryProducts,
  selectLoading,
  setLoading
} from "../../../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const baseUrl = process.env.REACT_APP_BASE_URL;

const mockCategoryName = [
  {
    id: "1",
    title: "Автоаксесуари",
    subCategory: [],
  },
  {
    id: "2",
    title: "Led та освітлення",
    subCategory: [
      {
        id: "56789ijh",
        title: "Автоаксесуари",
        subCategory: [
          {
            id: "1-1",
            title: "",
          },
        ],
      },
      {
        id: "98iuhb",
        title: "Led та освітлення",
        subCategory: [
          {
            id: "64635",
            title: "",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Фари",
    subCategory: [],
  },
  {
    id: "4",
    title: "Декоративне світло",
    subCategory: [],
  },
  {
    id: "5",
    title: "Електронні компоненти",
    subCategory: [],
  },
  {
    id: "6",
    title: "Кабельна продукція",
    subCategory: [
      {
        id: "1",
        title: "Автоаксесуари",
        subCategory: [
          {
            id: "1-1",
            title: "",
          },
        ],
      },
      {
        id: "2",
        title: "Led та освітлення",
        subCategory: [
          {
            id: "64635",
            title: "",
          },
        ],
      },
      {
        id: "3",
        title: "Фари",
        subCategory: [
          {
            id: "987",
            title: "",
          },
        ],
      },
      {
        id: "4",
        title: "Декоративне світло",
        subCategory: [
          {
            id: "1fg5",
            title: "",
          },
        ],
      },
      {
        id: "5",
        title: "Електронні компоненти",
        subCategory: [
          {
            id: "5-5",
            title: "",
          },
        ],
      },
      {
        id: "6",
        title: "Кабельна продукція",
        subCategory: [
          {
            id: "6-6",
            title: "",
          },
        ],
      },
      {
        id: "7",
        title: "Лазерне обладнання",
        subCategory: [
          {
            id: "7-7",
            title: "",
          },
        ],
      },
      {
        id: "8",
        title: "Мікрофони та аксесуари",
        subCategory: [
          {
            id: "8_8",
            title: "",
          },
        ],
      },
      {
        id: "9",
        title: "Металеві стійки, ферми",
        subCategory: [
          {
            id: "9-9",
            title: "",
          },
        ],
      },
      {
        id: "10",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "10-1",
            title: "",
          },
        ],
      },
      {
        id: "11",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "11-1",
            title: "",
          },
        ],
      },
      {
        id: "12",
        title: "Трансляційне обладнання",
        subCategory: [
          {
            id: "12-12",
            title: "",
          },
        ],
      },
      {
        id: "13",
        title: "Автоаксесуари",
        subCategory: [
          {
            id: "13-133",
            title: "",
          },
        ],
      },
      {
        id: "14",
        title: "Led та освітлення",
        subCategory: [
          {
            id: "232",
            title: "",
          },
        ],
      },
      {
        id: "15",
        title: "Фари",
        subCategory: [
          {
            id: "23235yfd",
            title: "",
          },
        ],
      },
      {
        id: "16",
        title: "Декоративне світло",
        subCategory: [
          {
            id: "1fdffdfwer",
            title: "",
          },
        ],
      },
      {
        id: "17",
        title: "Електронні компоненти",
        subCategory: [
          {
            id: "17-17",
            title: "",
          },
        ],
      },
      {
        id: "18",
        title: "Кабельна продукція",
        subCategory: [
          {
            id: "18-18",
            title: "",
          },
        ],
      },
      {
        id: "19",
        title: "Лазерне обладнання",
        subCategory: [
          {
            id: "19-19",
            title: "",
          },
        ],
      },
      {
        id: "20",
        title: "Мікрофони та аксесуари",
        subCategory: [
          {
            id: "20-20",
            title: "",
          },
        ],
      },
      {
        id: "21",
        title: "Металеві стійки, ферми",
        subCategory: [
          {
            id: "21-21",
            title: "",
          },
        ],
      },
      {
        id: "22",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "22-22",
            title: "",
          },
        ],
      },
      {
        id: "23",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "23-23",
            title: "",
          },
        ],
      },
      {
        id: "24",
        title: "Трансляційне обладнання",
        subCategory: [
          {
            id: "24-24",
            title: "",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    title: "Лазерне обладнання",
    subCategory: [],
  },
  {
    id: "8",
    title: "Мікрофони та аксесуари",
    subCategory: [],
  },
  {
    id: "9",
    title: "Металеві стійки, ферми",
    subCategory: [],
  },
  {
    id: "10",
    title: "Світлове обладнання",
    subCategory: [],
  },
  {
    id: "11",
    title: "Світлове обладнання",
    subCategory: [],
  },
  {
    id: "12",
    title: "Трансляційне обладнання",
    subCategory: [],
  },
  {
    id: "13",
    title: "Автоаксесуари",
    subCategory: [],
  },
  {
    id: "14",
    title: "Led та освітлення",
    subCategory: [],
  },
  {
    id: "15",
    title: "Фари",
    subCategory: [],
  },
  {
    id: "16",
    title: "Декоративне світло",
    subCategory: [],
  },
  {
    id: "17",
    title: "Електронні компоненти",
    subCategory: [],
  },
  {
    id: "18",
    title: "Кабельна продукція",
    subCategory: [],
  },
  {
    id: "19",
    title: "Лазерне обладнання",
    subCategory: [],
  },
  {
    id: "20",
    title: "Мікрофони та аксесуари",
    subCategory: [],
  },
  {
    id: "21",
    title: "Металеві стійки, ферми",
    subCategory: [],
  },
  {
    id: "22",
    title: "Світлове обладнання",
    subCategory: [],
  },
  {
    id: "23",
    title: "Світлове обладнання",
    subCategory: [],
  },
  {
    id: "24",
    title: "Трансляційне обладнання",
    subCategory: [],
  },
];

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), "-").toLowerCase();
};

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, item } = props;
  const { id, title, subCategory } = item;

  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);

  const fetchProductsByCategory = async (title) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${baseUrl}/product/?category=${title}`);
      dispatch(setLoading(false));
      dispatch(setCategoryProducts(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
      dispatch(setLoading(false));
    }
  };

  const fetchProductsBySubCategory = async (title) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${baseUrl}/product/?subcategory=${title}`
      );
      dispatch(setLoading(false));
      dispatch(setSubCategoryProducts(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="rc-accordion-card">
      {subCategory.length === 0 ? (
        <NavLink
          // to={`/${translit(title)}`}
          to={`/category`}
          onClick={() => {
            props.onClick()
            dispatch(setCategoryProducts([]));
            dispatch(setSubCategoryProducts([]));
            fetchProductsByCategory(title);
            localStorage.setItem("category", title);
            localStorage.removeItem("subcategory");
          }}
        >
          <div className="rc-accordion-title single">{title}</div>
        </NavLink>
      ) : (
        <div
          className={`rc-accordion-toggle p-3 ${active === id ? "active" : ""}`}
          onClick={(e) => handleToggle(id, e)}
        >
          <NavLink
            // to={`/${translit(title)}`}
            to={`/category`}
            className="rc-accordion-title"
            onClick={() => {
              props.onClick()
              dispatch(setCategoryProducts([]));
              dispatch(setSubCategoryProducts([]));
              fetchProductsByCategory(title);
              localStorage.setItem("category", title);
              localStorage.removeItem("subcategory");
            }}
          >
            {title}
          </NavLink>

          <ArrowDown className="arrow-down" />
        </div>
      )}

      {subCategory.length > 0 && (
        <div
          ref={contentEl}
          className={`rc-collapse ${active === id ? "show" : ""}`}
          style={
            active === id
              ? { height: contentEl.current.scrollHeight }
              : { height: "0px" }
          }
        >
          <div className="rc-accordion-body">
            {subCategory &&
              subCategory.map((sub) => {
                return (
                  <NavLink
                    to={`/category`}
                    // to={`${translit(title)}/${translit(sub.title)}`}
                    onClick={() => {
                      props.onClick()
                      dispatch(setSubCategoryProducts([]));
                      dispatch(setCategoryProducts([]));
                      fetchProductsBySubCategory(sub.title);
                      localStorage.setItem("subcategory", sub.title);
                      localStorage.removeItem("category");
                    }}
                    id={sub.id}
                    key={sub.id}
                  >
                    <div className="rc-accordion-body-title"> {sub.title}</div>
                  </NavLink>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

const Accordion = (props) => {
  const [active, setActive] = useState(null);

  const handleToggle = (index, e) => {
    if (e.target.localName === "div" || e.target.localName === "svg") {
      if (active === index) {
        setActive(null);
      } else {
        setActive(index);
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          {mockCategoryName.map((item, index) => {
            return (
              <AccordionItem
                key={index}
                active={active}
                handleToggle={handleToggle}
                item={item}
                onClick={props.onClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Accordion;
