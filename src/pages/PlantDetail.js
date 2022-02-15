import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import { checkAdminPermission } from "../service/Authentication";
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

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState(1);

  const radios = [
    { name: "Auto", value: "1" },
    { name: "Manual", value: "2" },
  ];

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkAdminPermission(navigate);
  }, []);

  useEffect(() => {
    setInterval(() => {
      const plantData = DUMMY_DATA;
      setPlantName(plantData.plantName);
      setMoisture(plantData.moisture);
      setHeight(plantData.height);
      setHumidity(plantData.humidity);
      setTemp(plantData.temp);
      if (plantData.autoState) {
        setAutoState(1);
      } else {
        setAutoState(2);
      }

      setChecked(true);
    }, 1000);
  }, []);

  return (
    <Fragment>
      <NaviBar />
      <Container className={` flex-end ${classes.container__top}`}>
        <Row>
          <Col>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-success" : "outline-danger"}
                  name="radio"
                  value={radio.value}
                  checked={autoState === idx}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                  disabled={!checked}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
          <Col className={classes.link__btn}>
            <Link to={`/addPlant/${id}`}>
              <Button type="submit">Editor</Button>
            </Link>
          </Col>
        </Row>
      </Container>

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
