import style from './Container.module.scss';

const Container = (props) => {
  return (
    <div className={`${style[props.container]} ${style[props.mod]}`} >
      {props.children}
    </div>  
  )
}
export default Container; 
