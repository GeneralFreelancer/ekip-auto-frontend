import React from "react";
import MainInfo from "./MainInfo";
import Characteristic from "./Characteristic";
import Pack from "./Pack";

const Description = (props) => {
  return (
    <>
      <section id="mainInfo">
        <MainInfo productId={props.productId}/>
      </section>
      <section id="characteristic">
        <Characteristic productId={props.productId}/>
      </section>
      <section id="pack">
        <Pack productId={props.productId}/>
      </section>
    </>
  );
};

export default Description;
