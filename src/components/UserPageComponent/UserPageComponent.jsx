// import Cart from './Cart/Cart';
import {Outlet} from 'react-router-dom';
import PageMenu from './PageMenu'

const UserPageComponent = () => {
  return(
    <>
      <section>
        <PageMenu />  
      </section>
      <Outlet/>
    </>
  )
}

export default UserPageComponent;
