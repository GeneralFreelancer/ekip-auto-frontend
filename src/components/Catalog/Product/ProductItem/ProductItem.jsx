import React, {useState, useEffect, useRef} from 'react';
import s from './ProductItem.module.scss';
import './ProductSlider.scss';
import Breadcrumbs from '../../Breadcrumps/Breadcrumbs';
import {ReactComponent as Cross} from '../../../../assets/svg/cross.svg';
import {ReactComponent as Tick} from '../../../../assets/svg/Tick.svg';
import {ReactComponent as Pen} from '../../../../assets/svg/edit.svg';
import {ReactComponent as Setting} from '../../../../assets/svg/setting.svg';
import {ReactComponent as Zoom} from '../../../../assets/svg/zoom-in.svg';
import {ReactComponent as Heart} from '../../../../assets/svg/heart.svg';
import {ReactComponent as Blackheart} from '../../../../assets/svg/black_heart.svg';
import Plus from '../../../../assets/plus.png';
import Minus from '../../../../assets/minus.png';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import PriceSlider from './PriceSlider/PriceSlider';
import 'react-image-gallery/styles/css/image-gallery.css';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {addProductsToCart} from '../../../../redux/features/cartSlice';
import {useSelector} from 'react-redux';
import {selectedUser} from '../../../../redux/features/userSlice';
import {
  updateProductQuantityInCart,
  selectedCart,
} from '../../../../redux/features/cartSlice';
import {addToFavorites} from '../../../../redux/features/userSlice';

const baseUrl = process.env.REACT_APP_BASE_URL;

// const images = [
//   "https://cdn.27.ua/799/9d/06/2596102_11.jpeg",
//   "https://zhzh.info/_pu/126/47073814.jpg",
//   "https://files.foxtrot.com.ua/PhotoNew/img_0_977_4158_1.jpg",
// ];

const ProductItem = ({selectedProduct}) => {
  const {
    id,
    name,
    quantity,
    minQuantity,
    minQuantity1,
    priceUAH,
    priceUSD,
    priceUSDless,
    sku,
    stock,
    hidden,
    pictures,
  } = selectedProduct;
  const cart = useSelector(selectedCart);
  const [role, setRole] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(name);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isEditableQuontity, setIsEditableQuontity] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [mouseEnter, setMouseEnter] = useState(false);
  // const [requestMessage, setRequestMessage] = useState(false);
  // const [showMessage, setShowMessage] = useState(false);
  const [isHidden, setIsHidden] = useState(hidden);
  const [images] = useState(pictures);
  const [imageSize, setImageSize] = useState('500px');

  const exchangeRate = localStorage.getItem('exchangeRate');
  const galleryExitRef = useRef(null);
  const quantityInputRef = useRef(null);

  const price1 = {
    uah: priceUAH,
    usd: Math.floor(priceUAH / exchangeRate),
  };
  const price2 = {uah: priceUSD * exchangeRate, usd: priceUSD};
  const price3 = {
    uah: priceUSDless * exchangeRate,
    usd: priceUSDless,
  };

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
          },
        );
      } catch (error) {
        console.error('Error:', error.message);
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewportWidth]);

  const localStor = localStorage.getItem('role');

  useEffect(() => {
    if (localStorage.getItem('role') === 'admin') {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [localStor]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyClick);
    return () => {
      document.removeEventListener('keydown', onKeyClick);
    };
  });

  useEffect(() => {
    const handleClickOutOfInput = (e) => {
      console.log('click out of input');
      if (isEditableQuontity === true) {
        if (
          quantityInputRef.current &&
          !quantityInputRef.current.contains(e.target)
        ) {
          setIsEditableQuontity(false);
        }
      }
    };
    if (isEditableQuontity === true) {
      window.addEventListener('click', handleClickOutOfInput);
    } else {
      window.removeEventListener('click', handleClickOutOfInput);
    }
    return () => {
      window.removeEventListener('click', handleClickOutOfInput);
    };
  }, [isEditableQuontity]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleEditProductQuantity = (e) => {
    setProductQuantity(Number(e.target.value));
  };

  const handleBlurProductQuantityInput = () => {
    if (productQuantity === '' || productQuantity < minQuantity) {
      setProductQuantity(minQuantity);
    }
    setIsEditableQuontity(false);
  };

  const handleSaveClick = async (id, name) => {
    setIsEditMode(false);
    try {
      const response = await axios.put(
        `${baseUrl}/product`,
        {id, name},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
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
        {id: id, hidden: newHiddenValue},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
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
        data: {id},
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
    if (productQuantity > 1) {
      setProductQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handlePlusClick = () => {
    if (productQuantity >= 1) {
      setProductQuantity((prevQuantity) => Number(prevQuantity) + 1);
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
        {productId: id},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      dispatch(addToFavorites(response.data.user.favoriteProducts));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async () => {
    let productToAdd = {...selectedProduct, quantity: productQuantity};

    if (
      cart.cartProducts &&
      cart.cartProducts.find((product) => product.id === selectedProduct.id)
    ) {
      productToAdd.quantity = productToAdd.quantity + productQuantity;
      dispatch(updateProductQuantityInCart(productToAdd));
    } else {
      dispatch(addProductsToCart(productToAdd));
    }
  };

  // const handleGoodsRequest = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${baseUrl}/product-request`,
  //       {
  //         productId: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       },
  //     );
  //     setRequestMessage(response.data.message);
  //     setShowMessage(true);
  //     setTimeout(() => {
  //       setShowMessage(false);
  //       setRequestMessage('');
  //     }, 2000);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };

  const handleFullscreenClick = () => {
    setIsZoomed(true);
    setImageSize('100vh');
  };

  const onKeyClick = (e) => {
    if (e.code === 'Escape') {
      setIsZoomed(false);
      setImageSize('500px');
    }
  };

  return (
    <>
      <div className={s.productItem_menu}></div>
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
                onClick={handleCancelClick}>
                <div className={s.btn_cancel}>
                  <Cross />
                </div>
              </button>
              <button
                className={s.productItem_btn_save}
                onClick={() => handleSaveClick(id, title)}>
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
              <div className={s.productItem_title_container}>
                <h1 className={s.productItem_h}>{title}</h1>
                <div className={s.productItem_devider}></div>
              </div>
              {role && (
                <button
                  className={`${
                    isEditMode
                      ? s.productItem_btn_edit_none
                      : s.productItem_btn_edit
                  }`}
                  onClick={handleEditClick}>
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
                        width: '100%',
                        height: '300px',
                      }}>
                      <img
                        style={{
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                          marginTop: '10px',
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
                  showBullets={true}
                  useBrowserFullscreen={false}
                  items={images}
                  renderFullscreenButton={(onClick) => (
                    <button
                      className={s.productItem_btn_zoom}
                      onClick={handleFullscreenClick}>
                      <Zoom onClick={onClick} />
                    </button>
                  )}
                  renderItem={(image, index) => (
                    <div
                      key={index}
                      style={{
                        width: '100%',
                        height: `${imageSize}`,
                        position: 'relative',
                      }}>
                      {isZoomed ? null : (
                        <span
                          style={{
                            width: '100%',
                            height: '90%',
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            if (galleryExitRef.current) {
                              galleryExitRef.current.fullScreen();
                              setImageSize('100vh');
                              setIsZoomed(true);
                            }
                          }}></span>
                      )}

                      <img
                        onClick={() => {
                          if (galleryExitRef.current) {
                            galleryExitRef.current.exitFullScreen();
                            setImageSize('500px');
                            setIsZoomed(false);
                          }
                        }}
                        style={{
                          objectFit: 'contain',
                          width: '100%',
                          height: '95%',
                          marginTop: '10px',
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
            <div style={{display: 'flex', gap: '10px'}}>
              <span className={s.productItem_is}>
                {stock ? 'В наявності' : 'Нема в наявності'}
              </span>
              {isEditMode && (
                <>
                  <button
                    onClick={hideProduct}
                    className={s.productItem_btn_ask}>
                    {isHidden ? 'Показати' : 'Скрити'}
                  </button>
                  <button
                    onClick={deleteProduct}
                    className={s.productItem_btn_ask}>
                    Видалити
                  </button>
                </>
              )}
            </div>
            <PriceSlider
              price1={price1}
              price2={price2}
              price3={price3}
              minQuantity={minQuantity}
              minQuantity1={minQuantity1}
              quantity={productQuantity}
              setQuantity={setProductQuantity}
            />
            <div>
              <p>Оберіть кількість товару:</p>
              <div className={s.productItem_quantity}>
                <div className={s.minus} onClick={handleMinusClick}>
                  <img src={Minus} alt="minus" />
                </div>
                <input
                  type="text"
                  value={productQuantity}
                  className={s.productItem_quantity_input}
                  ref={quantityInputRef}
                  onChange={(e) => handleEditProductQuantity(e)}
                  onBlur={() => handleBlurProductQuantityInput()}
                />
                <div className={s.plus} onClick={handlePlusClick}>
                  <img src={Plus} alt="plus" />
                </div>
              </div>
            </div>
            <div className={s.productItem_sum}>
              <div className={s.productItem_sum_container}>
                <p className={s.productItem_sum_title}>
                  <span>Сумма</span>:
                </p>
                <div className={s.productItem_sum_lines_wrapper}>
                  <div className={s.productItem_sum_lines_container}>
                    <div className={s.productItem_sum_top_line_container}>
                      <div
                        className={`${s.productItem_sum_top_line} ${s.first}`}></div>
                      <div className={s.productItem_sum_top_line}></div>
                    </div>
                    <div className={s.productItem_sum_middle_line}></div>
                    <div className={s.productItem_sum_bottom_line_container}>
                      <div
                        className={`${s.productItem_sum_bottom_line} ${s.left}`}></div>
                      <div
                        className={`${s.productItem_sum_bottom_line} ${s.right}`}></div>
                    </div>
                  </div>
                </div>
                <div className={s.productItem_btn_sum_container}>
                  <div>
                    <div className={s.productItem_btn_sum}>
                      <div className={s.productItem_btn_sum_number}>
                        {productQuantity === minQuantity ||
                        productQuantity < minQuantity1 - 1
                          ? price1.uah * productQuantity
                          : productQuantity === minQuantity1
                          ? price2.uah * productQuantity
                          : productQuantity > minQuantity1
                          ? price3.uah * productQuantity
                          : ''}{' '}
                      </div>
                      <div className={s.productItem_btn_sum_symbol}>
                        &#8372;
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={s.productItem_btn_sum}>
                      <div className={s.productItem_btn_sum_number}>
                        {productQuantity === 1 ||
                        productQuantity < minQuantity1 - 1
                          ? price1.usd * productQuantity
                          : productQuantity === minQuantity1
                          ? price2.usd * productQuantity
                          : productQuantity > minQuantity1
                          ? price3.usd * productQuantity
                          : ''}
                        {''}
                      </div>
                      <div className={s.productItem_btn_sum_symbol}>
                        &#65284;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.productItem_basket_btn}>
              <div className={s.btnAddToContainer}>
                <button
                  onClick={handleAddToCart}
                  className={s.productItem_addTo}>
                  Додати до кошика
                </button>
              </div>
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
                  {!mouseEnter ? (
                    <Heart className={s.heart} onMouseEnter={hadleMouseEnter} />
                  ) : (
                    <Blackheart
                      className={s.heartHover}
                      onMouseLeave={hadleMouseLeave}
                      onClick={handleFavouriteClick}
                    />
                  )}
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
