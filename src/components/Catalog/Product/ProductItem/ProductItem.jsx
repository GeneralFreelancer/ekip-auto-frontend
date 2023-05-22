import React, { useState, useEffect, useRef } from "react";
import s from "./ProductItem.module.scss";
import "./ProductSlider.scss";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as Tick } from "../../../../assets/svg/Tick.svg";
import { ReactComponent as Pen } from "../../../../assets/svg/edit.svg";
import { ReactComponent as Setting } from "../../../../assets/svg/setting.svg";
import { ReactComponent as Zoom } from "../../../../assets/svg/zoom-in.svg";
import { ReactComponent as Heart } from "../../../../assets/svg/heart.svg";
import { ReactComponent as Blackheart } from "../../../../assets/svg/black_heart.svg";
import Plus from "../../../../assets/plus.png";
import Minus from "../../../../assets/minus.png";
import { NavLink, Link } from "react-router-dom";
// import { Slide } from "react-slideshow-image";
// import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const initialTitle = `ASUS 100500 G Arial- Black (G170-48) `;

const images = [
  "https://cdn.27.ua/799/9d/06/2596102_11.jpeg",
  "https://zhzh.info/_pu/126/47073814.jpg",
  "https://files.foxtrot.com.ua/PhotoNew/img_0_977_4158_1.jpg",
];

const mockItems = [
  {
    id: "1",
    category: "category",
    title: "Назва товаруНазва товаруНазва товару",
    description: "lorem",
    options: [],
    deliveryOptions: [],
    SKU: "number1212sdsd",
    favorite: false,
    price: [1000, 100],
    minQuantity: 100,
    stock: true,
    image: [
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    ],
    quantity: 500,
  },
  {
    id: "2",
    category: "category",
    title: "Назва товару",
    description: "lorem",
    options: [],
    deliveryOptions: [],
    SKU: "number12sdsd",
    favorite: true,
    price: [15000, 120],
    minQuantity: 100,
    stock: true,
    image: [
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    ],
    quantity: 600,
  },
  {
    id: "3",
    category: "category",
    title: "Назва товару",
    description: "lorem",
    options: [],
    deliveryOptions: [],
    SKU: "number11sdsd",
    favorite: false,
    price: [10000, 160],
    minQuantity: 50,
    stock: true,
    image: [
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    ],
    quantity: 200,
  },
];

const ProductItem = (props) => {
  const [role, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(mockItems[2].minQuantity);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  // const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    if (viewportWidth < 1024) {
      setIsZoomed(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewportWidth]);

  // const handleZoomClick = (index) => {
  //   setIsZoomed(!isZoomed);
  // };

  const localStor = sessionStorage.getItem("role");

  useEffect(() => {
    if (sessionStorage.getItem("role") === "admin") {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [localStor]);

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
    if (quantity > mockItems[2].minQuantity) {
      setQuantity((prevQuantity) =>
        Math.max(prevQuantity - mockItems[2].minQuantity, 50)
      );
    }
  };

  const handlePlusClick = () => {
    if (quantity >= mockItems[2].minQuantity) {
      setQuantity(
        (prevQuantity) =>
          Number(prevQuantity) + Number(mockItems[2].minQuantity)
      );
    }
  };

  // const handleChangeQuantity = (e) => {
  //   const cleanedValue = e.target.value.replace(/\D/g, "");
  //   if (cleanedValue < mockItems[2].minQuantity) {
  //     console.log("Мінімальна кількість товару: " + mockItems[2].minQuantity);
  //   }
  //   setQuantity(cleanedValue);
  // };

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

  // const handleSlideChange = (previousIndex, nextIndex) => {
  //   setCurrentSlideIndex(nextIndex);
  // };

  // const properties = {
  //   // duration: 5000,
  //   transitionDuration: 500,
  //   infinite: false,
  //   indicators: true,
  //   arrows: true,
  //   autoplay: false,
  //   canSwipe: true,
  //   onChange: handleSlideChange,
  // };

  // const indicators = (index) => {
  //   console.log(index);
  //   return <div className="indicator">{index + 1}</div>;
  // };

  function scrollToAnchor(anchorId) {
    const element = document.getElementById(anchorId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const galleryExitRef = useRef(null);

  const [imageSize, setImageSize] = useState("500px");

  const handleFullscreenClick = () => {
    setIsZoomed(true);
    setImageSize("100vh");
  };

  return (
    <>
      <div className={s.productItem_menu}>
        <Link to="#" onClick={() => scrollToAnchor("mainInfo")}>
          Основна інформація
        </Link>
        <Link to="#" onClick={() => scrollToAnchor("characteristic")}>
          Характеристики
        </Link>
        <Link to="#" onClick={() => scrollToAnchor("pack")}>
          Характеристики пакування
        </Link>
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
              <NavLink to="/admin_product_photo">
                <button className={s.productItem_btn_setting}>
                  <Setting />
                </button>
              </NavLink>
            </div>
          ) : (
            <div className={s.productItem_title_item}>
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
            <div className={s.productItem_image}>
              {viewportWidth < 650 ? (
                <ImageGallery
                  showNav={false}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showBullets={true}
                  useBrowserFullscreen={false}
                  items={images}
                  renderItem={(image, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        height: "300px",
                        // height: "100%",
                      }}
                    >
                      <img
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                          marginTop: "10px",
                        }}
                        alt="Slide img"
                        src={image}
                      />
                    </div>
                  )}
                />
              ) : (
                <ImageGallery
                  ref={galleryExitRef}
                  showNav={true}
                  showPlayButton={false}
                  // showFullscreenButton={true}
                  showBullets={true}
                  useBrowserFullscreen={false}
                  items={images}
                  renderFullscreenButton={(onClick) => (
                    <button
                      className={s.productItem_btn_zoom}
                      onClick={handleFullscreenClick}
                    >
                      <Zoom onClick={onClick} />
                    </button>
                  )}
                  renderItem={(image, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        height: `${imageSize}`,
                        position: "relative",
                      }}
                    >
                      {isZoomed ? null : (
                        <span
                          style={{
                            width: "100%",
                            height: "90%",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                          }}
                          onClick={() => {
                            if (galleryExitRef.current) {
                              galleryExitRef.current.fullScreen();
                              setImageSize("100vh");
                              setIsZoomed(true);
                            }
                          }}
                        ></span>
                      )}

                      <img
                        onClick={() => {
                          if (galleryExitRef.current) {
                            galleryExitRef.current.exitFullScreen();
                            setImageSize("500px");
                            setIsZoomed(false);
                          }
                        }}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "95%",
                          marginTop: "10px",
                        }}
                        alt="Slide img"
                        src={image}
                      />
                    </div>
                  )}
                />
              )}
            </div>
          </div>
        </div>

        <div className={s.productItem_content_main}>
          <div className={s.productItem_content}>
            <p>
              <span className={s.productItem_is}>В наявності</span>
            </p>
            <div className={s.productItem_price}>
              <p>
                <span>
                  1500.99 <span>&#8372;/шт</span>
                </span>
              </p>
              <p>150.99 &#65284;/шт</p>
            </div>
            <div>
              <p>Мінімальне замовлення від: {mockItems[2].minQuantity} шт.</p>
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
                <div className={s.minus} onClick={handleMinusClick}>
                  <img src={Minus} alt="minus" />
                </div>
                <span
                  // onChange={handleChangeQuantity}
                  className={s.productItem_quantity_info}
                >
                  {quantity}
                </span>
                <div className={s.plus} onClick={handlePlusClick}>
                  <img src={Plus} alt="plus" />
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
                  <div className={s.productItem_btn_sum}>150 000</div>{" "}
                  <p>&#8372;</p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  <div className={s.productItem_btn_sum}>4 500</div>{" "}
                  <p>&#65284;</p>
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