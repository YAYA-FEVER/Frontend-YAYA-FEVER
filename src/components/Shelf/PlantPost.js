import React, { Fragment, useEffect, useState } from "react";
import Plant1 from "../../static/image/plant1.png";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const DUMMY_DATA = {
  plant_name: "PlantNAJA",
  detail: "SAWADDEEKUB asdlhadhadhaksdhaskhdakshdk",
  price: 5555555,
  ID: 2,
};

const PlantPost = (props) => {
  const [plantName, setPlantName] = useState(undefined);
  const [detail, setDetail] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    axios
      .get(
        `https://ecourse.cpe.ku.ac.th/exceed05/api/customer/plant_detail/${props.id}`
      )
      .then((response) => {
        console.log(response.data);
        setPlantName(response.data.plant_name);
        setDetail(response.data.detail);
        setPrice(response.data.price);
        setId(response.data.ID);
        setUrl(response.data.img);
        console.log(response.data.img);
      });
  }, []);
  const reserve = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: "Bearer " + token },
    };
    const data = {
      ID: props.id,
    };
    axios
      .post(
        "https://ecourse.cpe.ku.ac.th/exceed05/api/customer/reserve",
        data,
        headers
      )
      .then((reponse) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{plantName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={url} />
        <div className="detail">{detail}</div>
      </Modal.Body>
      <Modal.Footer>
        <div>Price ${price}</div>
        <div>
          {props.booking == 0 && localStorage.getItem("token") && (
            <Button variant="primary" onClick={reserve}>
              <div>Reserve</div>
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PlantPost;
