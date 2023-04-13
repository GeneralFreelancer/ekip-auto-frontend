import React, { useState } from "react";
import NavbarLink from "./components/NavbarLink";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import './index.scss'

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);

  const hideCartHandler = () => {
    setModalIsVisible(false);
  };


  return (
    <div style={{ backgroundColor: "black" , display: 'flex', alignItems: 'center'}}>
      {modalIsVisible && <Modal onHideCart={hideCartHandler} />}
      <NavbarLink/>
      <SearchBar />
    </div>
  );
}

export default App;
