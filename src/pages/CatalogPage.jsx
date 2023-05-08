import React from "react";
import MainContainer from "../components/MainContainer/MainContainer";
import { Outlet } from "react-router-dom";

const CatalogPage = () => {
  return (
    <MainContainer>
      <Outlet/>
    </MainContainer>
  );
};

export default CatalogPage;
