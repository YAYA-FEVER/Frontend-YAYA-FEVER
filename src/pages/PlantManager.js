import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasketItem from "../components/BasketComponent/BasketItem";
import NaviBar from "../components/NaviBar/NaviBar";
import PlantManagerShelf from "../components/Shelf/PlantManagerShelf";
import PlantSingleShelf from "../components/Shelf/PlantsingleShelf";
import ShelfHome from "../components/Shelf/ShelfHome";

const PlantManager = () => {
  return (
    <Fragment>
      <NaviBar />
      <PlantSingleShelf/>
    </Fragment>
  );
};

export default PlantManager ;
