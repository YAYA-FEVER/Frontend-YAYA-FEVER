import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import EditorForm from "../components/PlantEditor/EditorForm";
import ImageEditor from "../components/PlantEditor/ImageEditor";
import { checkAdminPermission } from "../service/Authentication";
import classes from "./AddPlant.module.css";
const AddPlant = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminPermission(navigate);
  }, []);
  
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
