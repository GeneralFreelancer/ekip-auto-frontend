import style from './Container.module.scss';

const Container = (props) => {
  
  return (
    <div className={`${style.container} ${style[props.styleName]}`} >
      {props.children}
    </div>  
  )
}
export default Container; 
