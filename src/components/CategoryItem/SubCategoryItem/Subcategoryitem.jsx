import style from './Subcategoryitem.module.scss';
import { Link } from 'react-router-dom';
import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), "-").toLowerCase();
};
const Subcategoryitem = (props) => {
  return(
      <div className={style.menu__subContent }>
        <div>
          {props.subCategory.map(({id, title}) => ( 
              <Link
                key={`${id}-${title}`}
                id={id}
                className={style.menu__content__link}
                to={`${props.categoryLink}/${translit(title)}`}
              >
                {title}
              </Link>
          ))}
        </div>
      </div>
  );
};

export default Subcategoryitem;