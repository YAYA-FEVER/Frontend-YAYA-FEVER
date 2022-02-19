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
  Alert,
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
  const [temp, setTemp] = useState(0);
  const [autoState, setAutoState] = useState();
  const [url, setUrl] = useState();

  const [sendHumidity, setSendHumidity] = useState(0);
  const [sendTime, setSendTime] = useState(0);

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState(1);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertState, setShowAlertState] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const radios = [
    { name: "Auto", value: "1" },
    { name: "Manual", value: "0" },
  ];

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkAdminPermission(navigate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      axios
        .get(
          `https://ecourse.cpe.ku.ac.th/exceed05/api/admin/plant_info/${id}`,
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((response) => {
          const newData = response.data;
          setPlantName(newData.plant_name);
          setMoisture(newData.humidity_soil_hard);
          setHeight(newData.height_hard);
          setHumidity(newData.humidity_air_hard);
          setTemp(newData.temp);
          setUrl(newData.img)
          if (newData.activate_auto == 1) {
            setAutoState(0);
          } else {
            setAutoState(1);
          }
          setChecked(true);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onChangeHandler = (event) => {
    setSendHumidity(event.target.value);
  };

  const changeModeHandler = (event) => {
    setChecked(false);
    if (sendTime == 0) {
      setShowAlertState("danger");
        setShowAlert(true);
        setChecked(true);
        setAlertMessage("please field the time");
        window.setTimeout(()=>{
          setShowAlert(false);
        },2000);
      return;
    }
    if (sendHumidity == 0) {
      setShowAlertState("danger");
        setShowAlert(true);
        setChecked(true);
        setAlertMessage("please field the humidity");
        window.setTimeout(()=>{
          setShowAlert(false);
        },2000);
      return;
    }
    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: "Bearer " + token },
    };
    const data = {
      ID: id,
      water_time: sendTime,
      humidity_soil_front: sendHumidity,
      activate_auto: event.currentTarget.value,
    };
    console.log(data);
    axios
      .post(
        "https://ecourse.cpe.ku.ac.th/exceed05/api/admin/auto_mode",
        data,
        headers
      )
      .then((response) => {
        setShowAlertState("success");
        setShowAlert(true);
        setChecked(true);
        setAlertMessage(response.data);
        window.setTimeout(()=>{
          setShowAlert(false);
        },2000);
      })
      .catch((error) => {
        console.log(error.response);
        setShowAlert(true);
        setShowAlertState("danger");
        setAlertMessage(error.response);
        window.setTimeout(()=>{
          setShowAlert(false);
        },2000);
      });
  };

  const sendConfigHandler= (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: "Bearer " + token },
    };
    const data = {
      ID: id,
      water_time: sendTime,
      humidity_soil_front: sendHumidity,
      activate_auto: autoState
    };
    axios
      .post(
        "https://ecourse.cpe.ku.ac.th/exceed05/api/admin/water_time",
        data,
        headers
      )
      .then((response) => {
        console.log(response);
        setShowAlertState("success");
        setShowAlert(true);
        setChecked(true);
        setAlertMessage(response.data);
        window.setTimeout(()=>{
          setShowAlert(false);
        },2000);
      })
      .catch((error) => {
        console.log(error.response);
        setShowAlert(true);
        setShowAlertState("danger");
        setAlertMessage(error.response);
        window.setTimeout(()=>{
          setShowAlert(false);
        },2000);
      });
  };

  const deletePlantHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: "Bearer " + token },
    };
    const data = {
      ID: id,
    };
    axios
      .post(
        "https://ecourse.cpe.ku.ac.th/exceed05/api/admin/delete_plant",
        data,
        headers
      )
      .then((response) => {
        console.log(response);
        setChecked(true);
        navigate("./plantManager");
      })
      .catch((error) => {
        console.log(error.response);
      });
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
      {showAlert && <Alert variant={showAlertState}>{alertMessage}</Alert>}
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
              <Fragment>
                <Form>
                  <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                    <p>moisture</p>
                    <Form.Control
                      type="number"
                      placeholder="moisture"
                      className={classes.humi__form}
                      value={sendHumidity}
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p>time</p>
                    <Form.Control
                      type="number"
                      placeholder="water time in seconds"
                      className={classes.humi__form}
                      onChange={(e) => setSendTime(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Fragment>
            
          </Col>
          <Col className={classes.link__btn}>
            <Link to={`/addPlant/${id}`}>
              <Button type="submit">Editor</Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className={classes["container-plant-image"]}>
        <img src={url} className={classes["plant-image"]}/>
      </Container>
      <Container className={classes.container}>
        <h2>{plantName}</h2>
        <Row>
          <Col className={classes.container__info}>
            <h4>moisture</h4>
            {moisture} %RH
          </Col>

          <Col className={classes.container__info}>
            <h4>humidity</h4>
            {humidity} %RH
          </Col>
        </Row>
        <Row>
          <Col className={classes.container__info}>
            <h4>height</h4>
            {height} cm.
          </Col>

          <Col className={classes.container__info}>
            <h4>temp</h4>
            {temp && temp.toFixed(2)}  ํC
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
