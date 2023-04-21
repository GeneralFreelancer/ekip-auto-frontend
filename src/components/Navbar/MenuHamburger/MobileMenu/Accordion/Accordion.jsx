import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

import "./Accordion.scss";

import CyrillicToTranslit from "cyrillic-to-translit-js";

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
    title: "Декоративне свiтло",
    subCategory: [],
  },
  {
    id: "5",
    title: "Електроннi компоненти",
    subCategory: [],
  },
  {
    id: "6",
    title: "Кабельна продукцiя",
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
        title: "Декоративне свiтло",
        subCategory: [
          {
            id: "1fg5",
            title: "",
          },
        ],
      },
      {
        id: "5",
        title: "Електроннi компоненти",
        subCategory: [
          {
            id: "5-5",
            title: "",
          },
        ],
      },
      {
        id: "6",
        title: "Кабельна продукцiя",
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
        title: "Мiкрофони та аксесуари",
        subCategory: [
          {
            id: "8_8",
            title: "",
          },
        ],
      },
      {
        id: "9",
        title: "Металевi стiйки, ферми",
        subCategory: [
          {
            id: "9-9",
            title: "",
          },
        ],
      },
      {
        id: "10",
        title: "Свiтлове обладнання",
        subCategory: [
          {
            id: "10-1",
            title: "",
          },
        ],
      },
      {
        id: "11",
        title: "Свiтлове обладнання",
        subCategory: [
          {
            id: "11-1",
            title: "",
          },
        ],
      },
      {
        id: "12",
        title: "Трансляцiйне обладнання",
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
        title: "Декоративне свiтло",
        subCategory: [
          {
            id: "1fdffdfwer",
            title: "",
          },
        ],
      },
      {
        id: "17",
        title: "Електроннi компоненти",
        subCategory: [
          {
            id: "17-17",
            title: "",
          },
        ],
      },
      {
        id: "18",
        title: "Кабельна продукцiя",
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
        title: "Мiкрофони та аксесуари",
        subCategory: [
          {
            id: "20-20",
            title: "",
          },
        ],
      },
      {
        id: "21",
        title: "Металевi стiйки, ферми",
        subCategory: [
          {
            id: "21-21",
            title: "",
          },
        ],
      },
      {
        id: "22",
        title: "Свiтлове обладнання",
        subCategory: [
          {
            id: "22-22",
            title: "",
          },
        ],
      },
      {
        id: "23",
        title: "Свiтлове обладнання",
        subCategory: [
          {
            id: "23-23",
            title: "",
          },
        ],
      },
      {
        id: "24",
        title: "Трансляцiйне обладнання",
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
    title: "Мiкрофони та аксесуари",
    subCategory: [],
  },
  {
    id: "9",
    title: "Металевi стiйки, ферми",
    subCategory: [],
  },
  {
    id: "10",
    title: "Свiтлове обладнання",
    subCategory: [],
  },
  {
    id: "11",
    title: "Свiтлове обладнання",
    subCategory: [],
  },
  {
    id: "12",
    title: "Трансляцiйне обладнання",
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
    title: "Декоративне свiтло",
    subCategory: [],
  },
  {
    id: "17",
    title: "Електроннi компоненти",
    subCategory: [],
  },
  {
    id: "18",
    title: "Кабельна продукцiя",
    subCategory: [],
  },
  {
    id: "19",
    title: "Лазерне обладнання",
    subCategory: [],
  },
  {
    id: "20",
    title: "Мiкрофони та аксесуари",
    subCategory: [],
  },
  {
    id: "21",
    title: "Металевi стiйки, ферми",
    subCategory: [],
  },
  {
    id: "22",
    title: "Свiтлове обладнання",
    subCategory: [],
  },
  {
    id: "23",
    title: "Свiтлове обладнання",
    subCategory: [],
  },
  {
    id: "24",
    title: "Трансляцiйне обладнання",
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

  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${active === id ? "active" : ""}`}
          onClick={(e) => handleToggle(id, e)}
        >
          <NavLink to={`/${translit(title)}`} className="rc-accordion-title">
            {title}
          </NavLink>
          <i className="fa fa-chevron-down rc-accordion-icon"></i>
        </div>
      </div>
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
                  to={`${translit(title)}/${translit(sub.title)}`}
                  id={sub.id}
                  key={sub.id}
                >
                  {sub.title}
                </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [active, setActive] = useState(null);

  const handleToggle = (index, e) => {
    if (e.target.localName === "div") {
      if (active === index) {
        setActive(null);
      } else {
        setActive(index);
      }
    }
  };

  return (
    <>
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-2">
            <div className="card">
              <div className="card-body">
                {/* <h4 className="form-heading mb-4 text-primary text-center mt-3">
                  React Accordion
                </h4> */}
                {mockCategoryName.map((item, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      active={active}
                      handleToggle={handleToggle}
                      item={item}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
