import {Droppable} from 'react-beautiful-dnd';

import s from './Line.module.scss';

const Line = ({column, pins, first}) => {
  return (
    <>
      <div className={first ? `${s.lineDevider} ${s.first}` : s.lineDevider}>
        <div className={s.line}></div>
      </div>
    </>
  );
};

export default Line;
