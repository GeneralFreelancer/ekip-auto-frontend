import style from './Share.module.scss';
import { useMediaPredicate } from "react-media-hook";
import { useState } from 'react';
import TableHead from './TableHead/TableHead';
import TableHeadMiddle from './TableHead/TableHeadMiddle';
import TableBody from './TableBody/TableBody';
import TableBodyMiddle from './TableBody/TableBodyMiddle';
import TableBodyMobile from './TableBody/TableBodyMobile';

const mockItems = [
  {
    id: '1',
    name: 'Сергій Притула',
    productId: '1',
    status: true,
    date: 1679497533000 
  },
  {
    id: '1',
    name: 'Сергій Притула',
    productId: '1',
    status: true,
    date: 1679497533000 
  },
  {
    id: '1',
    name: 'Сергій Притула',
    productId: '1',
    status: true,
    date: 1679497533000 
  },
]


const AdminComponentsShare = () => {
  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate("(min-width: 540px) and (max-width: 1023px)");
  const mobile = useMediaPredicate("(max-width: 540px)");
  const [dataMockItems, setDataMockItems] = useState(mockItems);
  
  //remover function delete items
  const remove = (id) => {
    console.log(id);
    // let templateArr = dataMockItems;
    // templateArr = [...templateArr].filter(item => item.id !== id);
    // console.log(templateArr);
    // setDataMockItems(templateArr);
  };
  // change favorite state in DB
  const access = (id) => {
    console.log(id);
    // let templateArr = dataMockItems;

    // templateArr = [...templateArr].filter(item => (
    //   item.id === id ? !item.favorite : !item.favorite
    //   ));
    // setDataMockItems(templateArr);
  }
  return(
    <>
      <div className={style.share__wrapper}>
      <div className={style.share__blockTitle}>доступ до залишків на складі</div>
      {desktop && <TableHead />}
      <table className={style.share__table}>
        <thead>
          {middle && <TableHeadMiddle />}
        </thead>
        <tbody>
          {desktop && <TableBody access={access} delete={remove} data={dataMockItems}/>}
          {middle && <TableBodyMiddle access={access} delete={remove} data={dataMockItems}/>}
          {mobile && <TableBodyMobile access={access} delete={remove} data={dataMockItems}/>}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default AdminComponentsShare;