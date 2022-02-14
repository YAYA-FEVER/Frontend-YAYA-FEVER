import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import classes from "./PlantDetail.module.css";
const DUMMY_DATA = {
  id: 1,
  plantName: "plant1",
  moisture: 30,
  humidity: 30,
  height: 50,
  temp: 20,
  autoState: true,
};

const PlantDetail = () => {
  const [plantName, setPlantName] = useState();
  const [moisture, setMoisture] = useState();
  const [humidity, setHumidity] = useState();
  const [height, setHeight] = useState();
  const [temp, setTemp] = useState();
  const [autoState, setAutoState] = useState();

  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    setInterval(() => {
      const plantData = DUMMY_DATA;
      setPlantName(plantData.plantName);
      setMoisture(plantData.moisture);
      setHeight(plantData.height);
      setHumidity(plantData.humidity);
      setTemp(plantData.temp);
      setAutoState(plantData.autoState);
    }, 1000);
  }, []);

  return (
    <Fragment>
      <NaviBar />
      <Container className={classes.container}>
        <h2>{plantName}</h2>
        <Row>
          <Col className={classes.container__info}>
            <h4>moisture</h4>
            {moisture}%RH
          </Col>

          <Col className={classes.container__info}>
            <h4>humidity</h4>
            {humidity}%RH
          </Col>
        </Row>
        <Row>
          <Col className={classes.container__info}>
            <h4>height</h4>
            {height} cm.
          </Col>

          <Col className={classes.container__info}>
            <h4>temp</h4>
            {temp} C
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default PlantDetail;
