import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import BasketItem from "../components/BasketComponent/BasketItem";
import NaviBar from "../components/NaviBar/NaviBar";
import classes from "./Basket.module.css"

const BasketPage = () => {
  return (
    <Fragment>
      <NaviBar />
      <Container className={classes.container}>
        <BasketItem />
      </Container>
    </Fragment>
  );
};

export default BasketPage;
