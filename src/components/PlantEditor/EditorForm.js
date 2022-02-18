import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { flushSync } from "react-dom";
import { useParams } from "react-router-dom";

const EditorForm = () => {
  const { id } = useParams();
  const [plantName, setPlantName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [plantId, setId] = useState(id);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
    if (price && plantId && plantName) {
      const token = localStorage.getItem("token");
      const headers = {
        headers: { Authorization: "Bearer " + token },
      };
      const payload = {
        ID: plantId,
        plant_name: plantName,
        detail: description,
        price: price,
      };
      axios
        .post(
          "https://ecourse.cpe.ku.ac.th/exceed05/api/admin/new_plant",
          payload,
          headers
        )
        .then((response) => {
          setShowAlert(true);
          setAlertMessage(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <Fragment>
      {showAlert && <Alert variant="danger">{alertMessage}</Alert>}
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
    </Fragment>
  );
};

export default EditorForm;
