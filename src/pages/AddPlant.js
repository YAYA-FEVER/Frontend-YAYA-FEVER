import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import EditorForm from "../components/PlantEditor/EditorForm";
import ImageEditor from "../components/PlantEditor/ImageEditor";
import classes from "./AddPlant.module.css";
const AddPlant = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/getpermission", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response.response);
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        navigate("/shelf");
      });
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
