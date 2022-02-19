import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { flushSync } from "react-dom";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { uploadImage } from "../../service/Upload";

const EditorForm = () => {
  const { id } = useParams();
  const [plantName, setPlantName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(undefined);
  const [plantId, setId] = useState(id);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fileState, setFileState] = useState(undefined);

  const onFileChange = (event) => {
    setFileState(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (plantId == undefined) {
      setShowAlert(true);
      setAlertMessage("please field the id");
      return;
    }
    if (fileState == undefined) {
      setShowAlert(true);
      setAlertMessage("please upload your image");
      return;
    }
    uploadImage(fileState).then(response => console.log(response))
  };

  useEffect(() => {
    if (id != undefined) {
      const token = localStorage.getItem("token");
      const headers = {
        headers: { Authorization: "Bearer " + token },
      };

      axios
        .get(
          `https://ecourse.cpe.ku.ac.th/exceed05/api/customer/plant_detail/${id}`,
          headers
        )
        .then((response) => {
          const newData = response.data;
          setPlantName(newData.plant_name);
          setDescription(newData.detail);
          setPrice(newData.price);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (plantId == undefined) {
      setShowAlert(true);
      setAlertMessage("please field the id");
      return;
    }
    if (fileState == undefined) {
      setShowAlert(true);
      setAlertMessage("please upload your image");
      return;
    }
    if (price && plantId && plantName) {}
    uploadImage(fileState).then(response => {
      const url = response;
      const token = localStorage.getItem("token");
      const headers = {
        headers: { Authorization: "Bearer " + token },
      };
      const payload = {
        ID: plantId,
        plant_name: plantName,
        detail: description,
        price: price,
        img: url
      };
      axios
        .post(
          "https://ecourse.cpe.ku.ac.th/exceed05/api/admin/set_plant",
          payload,
          headers
        )
        .then((response) => {
          setShowAlert(true);
          setAlertMessage(response.data);
        })
        .catch((error) => {
          setShowAlert(true);
          setAlertMessage(error.response);
        });
    })
    
      
    
  };

  return (
    <Fragment>
      <Row>
        <Col xs={5}>
          <input type="file" onChange={onFileChange} />
        </Col>
        <Col>
          {showAlert && <Alert variant="success">{alertMessage}</Alert>}

          <h2>Plant Editor</h2>
          <hr />
          <Form onSubmit={submitHandler}>
            <Form.Group
              className="mb-3"
              controlId="formBasicText"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
            >
              <Form.Label>Plant Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Plant name"
                defaultValue={plantName}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicText"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Describe your plant"
                defaultValue={description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicText"
              value={plantId}
              onChange={(e) => setId(e.target.value)}
            >
              <Form.Label>ID</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="ID"
                defaultValue={plantId}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EditorForm;
