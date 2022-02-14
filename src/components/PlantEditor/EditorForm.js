import React, { Fragment, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

const EditorForm = () => {
  const [plantName, setPlantName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [id, setId] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (price && id && plantName) {
      const payload = {
        id: id,
        plantName: plantName,
        plantDetail: description,
        price: price,
      };
      console.log(payload);
    }
  };

  return (
    <Fragment>
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
          <Form.Control required type="text" placeholder="Plant name" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicText"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder="Describe your plant" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicText"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <Form.Label>Price</Form.Label>
          <Form.Control required type="number" placeholder="Price" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicText"
          value={id}
          onChange={(e) => setId(e.target.value)}
        >
          <Form.Label>ID</Form.Label>
          <Form.Control required type="number" placeholder="ID" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default EditorForm;
