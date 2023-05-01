import React from "react";
import MyData from "../components/UserPage/MyData/MyData";
import PageMenu from "../components/UserPage/PageMenu/PageMenu";
import InfoBlock from "../components/UserPage/infoBlock/InfoBlock";

const MyDataPage = () => {
  return (
    <>
      <PageMenu />
      <InfoBlock/>
      <MyData />
    </>
  );
};
export default MyDataPage;
