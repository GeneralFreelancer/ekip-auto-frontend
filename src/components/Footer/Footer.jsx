import style from './Footer.module.scss';
import Container from '../Container';

const Footer = (props) => {
  console.log(props)
  return (
    <>
     <footer>
          <div className={style.wrapperFooter}>
            <Container>
              <p className={style.text}>
                Ekip-Auto. All rights reserved.
              </p>
              <div className={style.exchageContainer}>
                <p className={style.textSmall}>
                Курс доллара:<span className={style.textRate}>{props.currentRate}</span>UAH = 1$
                </p>
                <p className={style.text}>
                  2001-2023
                </p>
              </div>
            </Container>
          </div>
     </footer>
    </>
  )
}
export default Footer; 
