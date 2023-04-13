import style from './AuthNav.module.scss';
import { ReactComponent as User } from '../../assets/svg/authNav/user.svg';
import { useState } from 'react';



const AuthNav = () => {
    const [showModal, setShowModal] = useState(false);
    const [authUser, setAuthUser] = useState(false);

    const onClick = () => {
        // if (authUser) {
        //      setShowModal(prevState => { setShowModal(!prevState) })
        // }else{
        // виклик модалки
        // }

                     setShowModal(prevState => { setShowModal(!prevState) })
    };
    
    return (
        <>
            <User className={style.user} onClick={onClick} />
            {showModal &&
                <ul className={style.list}>
                    <li className={style.item}>
                        Моя сторінка
                    </li>
                    <li className={style.item}>
                        Замовлення
                    </li>
                    <li className={style.item}>
                        Вийти
                    </li>
                </ul>
            }
            {authUser &&
                <p>{authUser.name }</p>
            }
        </>
    )
}

export default AuthNav;