import React, {useState, useEffect} from "react";
import MainInfo from "./MainInfo";
import Characteristic from "./Characteristic";
import Pack from "./Pack";

const Description = (props) => {
  const [role, setRole] = useState(false);
  const localStor = sessionStorage.getItem('role')

  useEffect(() => {
    if (sessionStorage.getItem('role') === 'admin') {
      setRole(true)
    }
  }, [localStor]);

  return (
    <>
      <section id="mainInfo">
        <MainInfo productId={props.productId} role={role}/>
      </section>
      <section id="characteristic">
        <Characteristic productId={props.productId} role={role}/>
      </section>
      <section id="pack">
        <Pack productId={props.productId} role={role}/>
      </section>
    </>
  );
};

export default Description;
