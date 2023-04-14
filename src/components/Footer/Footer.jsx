import style from './footer.module.scss'

const Footer = () => {
  return (
    <>
     <footer >
        <div className={style.wrapperFooter}>
          <p className={style.text}>
            Ekip-Auto. All rights reserved.
          </p>
          <p className={style.text}>
            2001-2023
          </p>
        </div>
     </footer>
    </>
  )
}
export default Footer; 
