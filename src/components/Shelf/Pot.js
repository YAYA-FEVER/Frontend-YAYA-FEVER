import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import Plant1 from "../../static/image/plant1.png";
import Plant2 from "../../static/image/plant2.png";
import Plant3 from "../../static/image/plant3.png";
import PlantPost from "./PlantPost";
import classes from "./Pot.module.css";

const Pot = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    console.log("false");
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    console.log("true");
  };

  const id = props.Id;
  const booking = props.booking;
  const getImage = (id) => {
    if (id % 3 === 0) {
      return Plant2;
    } else if (id % 3 === 1) {
      return Plant1;
    } else {
      return Plant3;
    }
  };
  return (
    <Fragment>
      <PlantPost id={id} show={show} handleClose={handleClose} handleShow={handleShow} booking={booking}/> 
      <a className={classes.pot} onClick={handleShow}>
        <img
          src={getImage(id)}
          className={booking == 1 ? `${classes.reserved} plant` : `plant`}
        />
      </a>
    </Fragment>
  );
};

export default Pot;
