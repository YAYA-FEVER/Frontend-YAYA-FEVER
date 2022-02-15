import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import { checkAdminPermission } from "../service/Authentication";
import classes from "./PlantDetail.module.css";
import LoadingScreen from "../components/UI/LoadingScreen";
const DUMMY_DATA = {
  id: 1,
  plantName: "plant1",
  moisture: 30,
  humidity: 30,
  height: 50,
  temp: 20,
  autoState: 1,
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
    { name: "Auto", value: "0" },
    { name: "Manual", value: "0" },
  ];

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkAdminPermission(navigate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const plantData = DUMMY_DATA;
      setPlantName(plantData.plantName);
      setMoisture(plantData.moisture);
      setHeight(plantData.height);
      setHumidity(plantData.humidity);
      setTemp(plantData.temp);
      if (plantData.autoState == 1) {
        setAutoState(0);
      } else {
        setAutoState(1);
      }
      setChecked(true);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendHumidityHandler = (event) => {
    setChecked(false);
    const time = setTimeout(() => {
      setAutoState(event.target.value);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  };

  const changeModeHandler = (event) => {
    setAutoState(event.currentTarget.value);
  };

  const deletePlantHandler = () => {
    console.log();
  };

  return (
    <Fragment>
      {!checked &&
        ReactDOM.createPortal(
          <LoadingScreen />,
          document.getElementById("modal")
        )}
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
                  onChange={changeModeHandler}
                  disabled={!checked}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            {autoState == 0 && (
              <Form onSubmit={sendHumidityHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    placeholder="humidity"
                    className={classes.humi__form}
                  />
                </Form.Group>
              </Form>
            )}
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
      <Container className={classes.container_delete}>
        <Button
          onClick={deletePlantHandler}
          variant="danger"
          className={classes.btn_delete}
        >
          Delete
        </Button>
      </Container>
    </Fragment>
  );
};

export default PlantDetail;
