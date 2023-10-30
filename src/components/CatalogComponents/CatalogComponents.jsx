import {useEffect, useState} from 'react';
import InStock from './InStock';
import Filter from './Filter';
import ListCards from '../ListCards';
import Pagination from 'rc-pagination';
import Breadcrumbs from '../Catalog/Breadcrumps/Breadcrumbs';
import {ReactComponent as Arrow} from '../../assets/svg/up-arrow.svg';
import './Pagination/Pagination.scss';
import s from './CatalogComponents.module.scss';

const CatalogComponents = ({products, title}) => {
  const [filter, setFilter] = useState('new');
  const [inStock, setInStock] = useState(false);
  const [items, setItems] = useState(products);
  const [filteredArr, setFilteredArr] = useState([]);

  const [perPage, setPerPage] = useState(10);
  const [current, setCurrent] = useState(1);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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
      setPerPage(12);
    }
    if (width <= 462) {
      setPerPage(10);
    }
  };

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    changeCardsQuantity(viewportWidth);
    setCurrent(1);
  }, [viewportWidth]);

  useEffect(() => {
    setItems(products);
  }, []);

  useEffect(() => {
    let filteredItems;
    filteredItems = items.filter((item) =>
      inStock ? item.stock === inStock : item,
    );
    switch (filter) {
      case 'new':
        filteredItems = [...filteredItems].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        break;
      case 'popular':
        filteredItems = [...filteredItems].sort(
          (a, b) => b.inTopRate - a.inTopRate,
        );
        break;
      case 'cheap':
        filteredItems = [...filteredItems].sort(
          (a, b) => a.priceUAH - b.priceUAH,
        );
        break;
      case 'expensive':
        filteredItems = [...filteredItems].sort(
          (a, b) => b.priceUAH - a.priceUAH,
        );
        break;
      default:
        break;
    }
    setCurrent(1);
    setFilteredArr(filteredItems);
  }, [filter, inStock, items]);

  const onChangeParams = (name, value) => {
    if (name === 'filter') {
      setFilter(value);
    } else {
      setInStock(value);
    }
  };

  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return filteredArr.slice((current - 1) * pageSize, current * pageSize);
  };

  useEffect(() => {
    getData(current, perPage);
  }, [current, perPage]);

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <Arrow className="arrow left" style={{transform: 'rotate(270deg)'}} />
      );
    }
    if (type === 'next') {
      return (
        <Arrow className="arrow right" style={{transform: 'rotate(90deg)'}} />
      );
    }
    return originalElement;
  };

  return (
    <section>
      <div className={s.mainWrapper}>
        <div className={s.breadcrumbsContainer}>
          <Breadcrumbs selectedProduct={items[0]} absolute={true} />
          <div className={s.titleWrapper}>
            <div className={s.titleContainer}>
              <div className={s.title}>{title}</div>
              <div className={s.lineContainer}>
                <div className={s.line}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.wrapper}>
          <Filter onChangeParams={onChangeParams} />
          <Pagination
            className="pagination-data"
            onChange={PaginationChange}
            total={filteredArr.length}
            current={current}
            pageSize={perPage}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
          />
          <InStock onChangeParams={onChangeParams} />
        </div>
        <div className={s.wrapperListCards}>
          <ListCards
            showAll={true}
            items={getData(current, perPage)}
            need_A_Slider={false}
          />
        </div>
        <div className="bottom">
          <Pagination
            className="pagination-data"
            onChange={PaginationChange}
            total={filteredArr.length}
            current={current}
            pageSize={perPage}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
          />
        </div>
      </div>
    </section>
  );
};

export default CatalogComponents;
