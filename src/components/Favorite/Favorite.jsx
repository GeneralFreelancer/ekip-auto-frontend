import s from "./Favorite.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "rc-pagination";
import { ReactComponent as Arrow } from "../../assets/svg/up-arrow.svg";
import "../CatalogComponents/Pagination/Pagination.scss";
import FavoriteList from "./FavoriteList/FavoriteList";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { setFavoriteProducts } from "../../redux/features/favoriteSlice";
import { addToFavorites } from "../../redux/features/userSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Favorite = () => {
  const [items, setItems] = useState([]);
  const [perPage, setPerPage] = useState(36);
  const [current, setCurrent] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(selectedUser);
  const dispatch = useDispatch();

  const changeCardsQuantity = (width) => {
    if (width > 1575) {
      setPerPage(36);
    }
    if (width <= 1575) {
      setPerPage(25);
    }
    if (width <= 1350) {
      setPerPage(20);
    }
    if (width <= 1075) {
      setPerPage(18);
    }
    if (width <= 825) {
      setPerPage(18);
    }
    if (width <= 462) {
      setPerPage(18);
    }
  };

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    changeCardsQuantity(viewportWidth);
    setCurrent(1);
  }, [viewportWidth]);

  const getFavouriteProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product/favorite`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(setFavoriteProducts(response.data.products));
      setItems(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFavouriteProducts();
  }, [dispatch, user.token]);

  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return items.slice((current - 1) * pageSize, current * pageSize);
  };

  useEffect(() => {
    getData(current, perPage);
  }, [current, perPage]);

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <Arrow className="arrow left" style={{ transform: "rotate(270deg)" }} />
      );
    }
    if (type === "next") {
      return (
        <Arrow className="arrow right" style={{ transform: "rotate(90deg)" }} />
      );
    }
    return originalElement;
  };

  const handelClick = async (id) => {
    try {
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
    getFavouriteProducts();
  };

  return (
    <>
      <div className={s.wrapperListCards}>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            <FavoriteList
              items={getData(current, perPage)}
              handelClick={handelClick}
            />
            {items.length > perPage && (
              <Pagination
                className="pagination-data"
                onChange={PaginationChange}
                total={items.length}
                current={current}
                pageSize={perPage}
                showSizeChanger={false}
                itemRender={PrevNextArrow}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Favorite;
