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
import { NavLink, Link, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setProductsInCart } from "../../../../redux/features/cartSlice";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../../redux/features/userSlice";
import { addToFavorites } from "../../../../redux/features/userSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

// const images = [
//   "https://cdn.27.ua/799/9d/06/2596102_11.jpeg",
//   "https://zhzh.info/_pu/126/47073814.jpg",
//   "https://files.foxtrot.com.ua/PhotoNew/img_0_977_4158_1.jpg",
// ];

const ProductItem = ({ selectedProduct }) => {
  const {
    id,
    name,
    quantity,
    minQuantity,
    priceUAH,
    priceUSD,
    sku,
    stock,
    hidden,
    pictures,
  } = selectedProduct;

  const [role, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(name);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productQuantity, setProductQuantity] = useState(minQuantity);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [requestMessage, setRequestMessage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isHidden, setIsHidden] = useState(hidden);
  const [images, setImages] = useState(pictures);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  useEffect(() => {
    const getLastSeenProduct = async () => {
      try {
        const response = await axios.put(
          `${baseUrl}/user/last-seen`,
          {
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    if (user.token) {
      getLastSeenProduct();
    }
  }, [id, user.token]);

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

  const localStor = localStorage.getItem("role");

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [localStor]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async (id, name) => {
    setIsEditMode(false);
    try {
      const response = await axios.put(
        `${baseUrl}/product`,
        { id, name },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setTitle(name);
  };

  const hideProduct = async () => {
    const newHiddenValue = !isHidden;
    try {
      const response = await axios.put(
        `${baseUrl}/product`,
        { id: id, hidden: newHiddenValue },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsHidden(newHiddenValue);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

 
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/product/${id}`, {
        data: { id },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
        navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleMinusClick = () => {
    if (productQuantity > minQuantity) {
      setProductQuantity((prevQuantity) =>
        Math.max(prevQuantity - minQuantity, minQuantity)
      );
    }
  };

  const handlePlusClick = () => {
    if (productQuantity >= minQuantity) {
      setProductQuantity((prevQuantity) =>
        Number(prevQuantity) + Number(minQuantity) <= quantity
          ? Number(prevQuantity) + Number(minQuantity)
          : quantity
      );
    }
  };

  const hadleMouseEnter = () => {
    setMouseEnter(true);
  };
  
  const hadleMouseLeave = () => {
    setMouseEnter(false);
  };

  const handleFavouriteClick = async () => {
    try {
      setIsFavorite(!isFavorite);
      const response = await axios.put(
        `${baseUrl}/user/favorite`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(addToFavorites(response.data.user.favoriteProducts));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/basket`,
        {
          product: id,
          number: productQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(setProductsInCart(response.data.basket.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleGoodsRequest = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/product-request`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setRequestMessage(response.data.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setRequestMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  function scrollToAnchor(anchorId) {
    const element = document.getElementById(anchorId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const totalAmountUAH = priceUAH * productQuantity;
  const totalAmountUSD = priceUSD * productQuantity;

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
                onClick={() => handleSaveClick(id, title)}
              >
                <Tick />
              </button>
              <NavLink to={`/admin_product_photo/${id}`}>
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
            <div style={{ display: "flex", gap: "10px" }}>
              <span className={s.productItem_is}>
                {stock ? "В наявності" : "Нема в наявності"}
              </span>
              {isEditMode && (
                <>
                  <button
                    onClick={hideProduct}
                    className={s.productItem_btn_ask}
                  >
                    {isHidden ? "Показати" : "Скрити"}
                  </button>
                  <button
                    onClick={deleteProduct}
                    className={s.productItem_btn_ask}
                  >
                    Видалити
                  </button>
                </>
              )}
            </div>
            <div className={s.productItem_price}>
              <p>
                <span>
                  {priceUAH} <span>&#8372;/шт</span>
                </span>
              </p>
              <p>{priceUSD} &#65284;/шт</p>
            </div>
            <div>
              <p>Мінімальне замовлення від: {minQuantity} шт.</p>
              <div className={s.productItem_info}>
                <p>Залишок на складі:</p>
                <button
                  onClick={handleGoodsRequest}
                  className={s.productItem_btn_ask}
                >
                  Запитати доступ
                </button>
                {showMessage && (
                  <p style={{ color: "red" }}>{requestMessage}</p>
                )}
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
                  {productQuantity}
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
                <div style={{ position: "relative" }}>
                  <div className={s.productItem_btn_sum}>{totalAmountUAH}</div>
                  <p
                    style={{ position: "absolute", top: "8px", right: "-15px" }}
                  >
                    &#8372;
                  </p>
                </div>
                <div style={{ position: "relative" }}>
                  <div className={s.productItem_btn_sum}>{totalAmountUSD}</div>
                  <p
                    style={{ position: "absolute", top: "6px", right: "-19px" }}
                  >
                    &#65284;
                  </p>
                </div>
              </div>
            </div>
            <div className={s.productItem_basket_btn}>
              <button onClick={handleAddToCart} className={s.productItem_addTo}>
                Додати до кошика
              </button>
              <p>
                *Кількість товару ви зможете відредагувати при підтвердженні
                замовлення!
              </p>
            </div>
          </div>

          <div className={s.productItem_favourite}>
            <div className={s.productItem_sku}>Art: {sku}</div>
            <div className={s.productItem_heart}>
              {isFavorite ? (
                <Blackheart
                  className={s.heart}
                  onClick={handleFavouriteClick}
                />
              ) : (
                <>
                  {!mouseEnter ? <Heart className={s.heart} onMouseEnter={hadleMouseEnter}/> : <Blackheart
                    className={s.heartHover}
                    onMouseLeave={hadleMouseLeave}
                    onClick={handleFavouriteClick}
                  />}
                </>
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


