import Cart from './Cart/Cart';
import PageMenu from './PageMenu'

const UserPageComponent = () => {
  return(
    <>
      <section>
        <PageMenu />  
      </section>
      <section>
        <Cart />
      </section>
    </>
  )
}

export default UserPageComponent;