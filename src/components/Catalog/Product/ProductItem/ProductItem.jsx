import React, { useState, useEffect } from "react";
import s from "./ProductItem.module.scss";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as Tick } from "../../../../assets/svg/Tick.svg";
import { ReactComponent as Pen } from "../../../../assets/svg/edit.svg";
import { ReactComponent as Setting } from "../../../../assets/svg/setting.svg";
import { ReactComponent as Zoom } from "../../../../assets/svg/zoom-in.svg";
import { ReactComponent as Heart } from "../../../../assets/svg/heart.svg";
import { ReactComponent as Blackheart } from "../../../../assets/svg/black_heart.svg";
import { NavLink } from "react-router-dom";
import { Slide } from "react-slideshow-image";
// import axios from "axios";

const initialTitle = `ASUS 100500 G Arial- Black (G170-48) `;

const images = [
  "https://cdn.27.ua/799/9d/06/2596102_11.jpeg",
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];
const indicators = (index) => <div className="indicator">{index + 1}</div>;

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

const ProductItem = (props) => {
  const [role] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(500);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleZoomClick = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", "admin");
    } else {
      localStorage.setItem("role", "user");
    }
  }, [role]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setTitle(initialTitle);
  };

  const handleMinusClick = () => {
    setQuantity(quantity - 1);
  };

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const handleFavouriteClick = async () => {
    setIsFavorite(!isFavorite);
    // if (!isFavorite) {
    //   try {
    //     await axios.post("/myprofile/favorite", props.productId);
    //     console.log("Product added to favorites");
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  return (
    <>
      <div>Хлібні крихти</div>
      <div className={s.productItem_menu}>
        <a href="#mainInfo"> Основна інформація</a>
        <a href="#characteristic"> Характеристики</a>
        <a href="#pack"> Характеристики пакування</a>
      </div>
      <div className={s.productItem_block}>
        <div className={s.productItem_block_image}>
          {isEditMode ? (
            <div className={s.productItem_block_title}>
              <input
                className={s.productItem_input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className={s.productItem_btn_cancel}
                onClick={handleCancelClick}
              >
                <div className={s.btn_cancel}>
                  <Cross />
                </div>
              </button>
              <button
                className={s.productItem_btn_save}
                onClick={handleSaveClick}
              >
                <Tick />
              </button>
              <NavLink to="/admin">
                <button className={s.productItem_btn_setting}>
                  <Setting />
                </button>
              </NavLink>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <h1 className={s.productItem_h}>{title}</h1>
              {role && (
                <button
                  className={`${
                    isEditMode
                      ? s.productItem_btn_edit_none
                      : s.productItem_btn_edit
                  }`}
                  onClick={handleEditClick}
                >
                  <Pen />
                </button>
              )}
            </div>
          )}

          <div className={s.productItem_imgBlock}>
            <div
              className={s.productItem_image}
              // className={`${s.productItem_image} ${isZoomed ? s.zoomed : ""}`}
              // onClick={handleZoomClick}
            >
              {viewportWidth < 620 ? (
                <Slide indicators={indicators} scale={1.4} {...properties}>
                  {images.map((each, index) => (
                    <div key={index} style={{ width: "100%" }}>
                      <img
                        // className={`${isZoomed ? s.zoomed : ""}`}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "340px",
                        }}
                        alt="Slide img"
                        src={each}
                      />
                    </div>
                  ))}
                </Slide>
              ) : (
                <Slide indicators={indicators} scale={1.4} {...properties}>
                  {images.map((each, index) => (
                    <div key={index} style={{ width: "100%" }}>
                      <img
                        className={`${isZoomed ? s.zoomed : ""}`}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "500px",
                        }}
                        alt="Slide img"
                        src={each}
                      />
                    </div>
                  ))}
                </Slide>
              )}

              {/* <div className={s.bg_image}></div> */}
            </div>
            <button
              className={s.productItem_btn_zoom}
              onClick={handleZoomClick}
            >
              <Zoom />
            </button>
            <div></div>
          </div>
        </div>

        <div className={s.productItem_content_main}>
          <div className={s.productItem_content}>
            <p>
              <span className={s.productItem_is}>В наявності</span>
            </p>
            <div className={s.productItem_price}>
              <p>
                <span>1500.99 ₴/шт</span>
              </p>
              <p>150.99 $/шт</p>
            </div>
            <div>
              <p>Мінімальне замовлення від: 500 шт.</p>
              <div className={s.productItem_info}>
                <p>Залишок на складі:</p>
                <button className={s.productItem_btn_ask}>
                  Запитати доступ
                </button>
              </div>
            </div>
            <div>
              <p>Оберіть кількість товару:</p>
              <div className={s.productItem_quantity}>
                <div
                  className={s.productItem_quantity_minus}
                  onClick={handleMinusClick}
                ></div>
                <div className={s.productItem_quantity_info}>{quantity}</div>
                <div class={s.plus} onClick={handlePlusClick}>
                  <div class={s.plus__vertical}></div>
                  <div class={s.plus__horizontal}></div>
                </div>
              </div>
            </div>
            <div className={s.productItem_sum}>
              <p>
                <span>Сумма</span>:
              </p>
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div className={s.productItem_btn_sum}>150 000</div> ₴
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div className={s.productItem_btn_sum}>4 500</div> $
                </div>
              </div>
            </div>
            <div className={s.productItem_basket_btn}>
              <button className={s.productItem_addTo}>Додати до кошика</button>
              <p>
                *Кількість товару ви зможете відредагувати при підтвердженні
                замовлення!
              </p>
            </div>
          </div>

          <div className={s.productItem_favourite}>
            <div className={s.productItem_sku}>Art: SU 845-64</div>
            <div className={s.productItem_heart}>
              {isFavorite ? (
                <Blackheart
                  className={s.heart}
                  onClick={handleFavouriteClick}
                />
              ) : (
                <Heart className={s.heart} onClick={handleFavouriteClick} />
              )}

              <p>*Додати до обраного</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
