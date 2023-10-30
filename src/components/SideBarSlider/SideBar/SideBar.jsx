import React from 'react';
import style from './SideBar.module.scss';
import CategoryItem from '../../CategoryItem';
import {selectCategoryNames} from '../../../redux/features/productsSlice';
import {useSelector} from 'react-redux';

const SideBar = () => {
  const categoryNames = useSelector(selectCategoryNames);

  return (
    <div className={style.wrapper}>
      <CategoryItem key={'2'} styleItem={'sidebar'} data={categoryNames} />
    </div>
  );
};

export default SideBar;
