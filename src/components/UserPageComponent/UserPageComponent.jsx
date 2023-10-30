import {Outlet} from 'react-router-dom';
import PageMenu from './PageMenu';

const UserPageComponent = () => {
  return (
    <>
      <PageMenu />
      <Outlet />
    </>
  );
};

export default UserPageComponent;
