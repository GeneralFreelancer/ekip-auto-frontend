import style from './hamburger.module.scss';
import {useEffect, useState, useRef} from 'react';
import {ReactComponent as Humburger} from '../../../assets/svg/hamburger.svg';
import CategoryItem from '../../CategoryItem';
import {useLocation} from 'react-router-dom';
import MobileMenu from './MobileMenu/MobileMenu';
import {useSelector} from 'react-redux';
import {selectCategoryNames} from '../../../redux/features/productsSlice';

// Example of categories and subcategories array
// const mockCategoryName = [
//   {
//     id: "1",
//     categories: "Автоаксесуари",
//     subCategory: [
//   {id: "2", title: ""}
//    ],
//   },
// ];

const MenuHamburgere = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [scrollPosition, setPosition] = useState({scrollX: 0, scrollY: 0});
  const location = useLocation();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const categoryNames = useSelector(selectCategoryNames);

  let desktopV = viewportWidth > 1024;

  const wrapperShoppingCardRef = useRef(null);

  useEffect(() => {
    const handleClickWindow = (e) => {
      if (isActive) {
        if (
          wrapperShoppingCardRef.current &&
          !e.composedPath().includes(wrapperShoppingCardRef.current)
        ) {
          setIsActive(false);
        }
      }
    };

    if (isActive === true) {
      window.addEventListener('click', handleClickWindow);
    } else {
      window.removeEventListener('click', handleClickWindow);
    }

    return () => {
      window.removeEventListener('click', handleClickWindow);
    };
  }, [isActive]);

  const handleClick = () => {
    if (desktopV) {
      if (scrollPosition.scrollY < 435 && location.pathname === '/') {
        window.scrollTo({top: 0, behavior: 'smooth'});
      } else {
        setIsActive((current) => !current);
      }
    } else {
      setIsActive((prevState) => !prevState);
    }
  };

  useEffect(() => {
    if (isActive && !desktopV) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [desktopV, isActive]);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (desktopV) {
      if (scrollPosition.scrollY < 435 && location.pathname === '/') {
        setIsActive(false);
      }
    }
  }, [
    desktopV,
    isActive,
    location.pathname,
    scrollPosition.scrollY,
    viewportWidth,
  ]);

  const useWindowScrollPositions = () => {
    useEffect(() => {
      function updatePosition() {
        setPosition({scrollX: window.scrollX, scrollY: window.scrollY});
      }
      window.addEventListener('scroll', updatePosition);
      updatePosition();
      return () => window.removeEventListener('scroll', updatePosition);
    }, []);
  };

  useWindowScrollPositions();

  return (
    <div ref={wrapperShoppingCardRef}>
      <div className={style.menu__hamburger} onClick={handleClick}>
        <Humburger className={style.menu__icon} />
      </div>
      {isActive &&
        (desktopV ? (
          <CategoryItem data={categoryNames} />
        ) : (
          <MobileMenu
            onShowModal={props.onShowModal}
            onClick={() => handleClick()}
          />
        ))}
    </div>
  );
};
export default MenuHamburgere;
