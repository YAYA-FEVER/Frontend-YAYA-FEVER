import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasketItem from "../components/BasketComponent/BasketItem";
import NaviBar from "../components/NaviBar/NaviBar";
import ShelfHome from "../components/Shelf/ShelfHome";

const Shelf = () => {
  return (
    <Fragment>
      <NaviBar />
      <div>ShelfHome</div>
    </Fragment>
  );
};

export default Shelf;
