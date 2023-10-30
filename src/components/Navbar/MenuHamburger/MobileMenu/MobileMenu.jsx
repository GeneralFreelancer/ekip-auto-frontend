import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import s from './MobileMenu.module.scss';

import NavbarLink from '../../NavbarLinkLogo/NavbarLink';
import Accordion from './Accordion/Accordion';
import Logo from '../../NavbarLinkLogo/Logo/Logo';

import {ReactComponent as Cross} from '../../../../assets/svg/cross.svg';
import {ReactComponent as UserMob} from '../../../../assets/svg/authNav/user.svg';

import {selectedUser} from '../../../../redux/features/userSlice';

const MobileMenu = (props) => {
  const user = useSelector(selectedUser);

  return (
    <div className={s.mobile_modal}>
      <div className={s.mobile_modal_header}>
        <div
          className={
            (user.isLoggedIn || user.isRegisteredConfirmed) && s.mobile_cross
          }>
          <Cross className={s.cross} onClick={props.onClick} />
        </div>
        <Logo styleItem={'modal__center'} />
        <div className={s.userMob_block}>
          {user.isRegisteredConfirmed ? (
            <Link to={'/myprofile/mydata'}>
              {user.isDataFullFilled ? (
                <UserMob className={s.userMob} />
              ) : (
                <UserMob className={`${s.userMob} ${s.userMob_red}`} />
              )}
            </Link>
          ) : (
            <UserMob
              className={s.userMob}
              onClick={() => {
                props.onShowModal();
              }}
            />
          )}
        </div>
      </div>
      <NavbarLink styleItem={'logo_navlink_mobile'} />
      <Accordion onClick={props.onClick} />
    </div>
  );
};

export default MobileMenu;
