import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import NaviBar from "../components/NaviBar/NaviBar";
import EditorForm from "../components/PlantEditor/EditorForm";
import ImageEditor from "../components/PlantEditor/ImageEditor";
import classes from "./AddPlant.module.css";
const AddPlant = () => {
  return (
    <Fragment>
      <NaviBar />
      <Container className={classes.editor__container}>
        <Row>
          <Col xs={5}>
            <ImageEditor />
          </Col>
          <Col>
            <EditorForm />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddPlant;
