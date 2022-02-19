import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Card, Container, Alert } from "react-bootstrap";
import LoadingScreen from "../UI/LoadingScreen";
import classes from "./BasketItem.module.css";
import { useNavigate } from "react-router-dom";
const DUMMY_DATA = [
  {
    ID: 1,
    duedate: "2/2/65",
    plant_name: "plant 1",
  },
  {
    ID: 2,
    duedate: "3/2/65",
    plant_name: "plant 2",
  },
  {
    ID: 3,
    duedate: "4/2/65",
    plant_name: "plant 3s",
  },
];

const BasketItem = () => {
  const [showLoading, setShowLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertState, setShowAlertState] = useState("");
  const [basketData, setBasketData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://ecourse.cpe.ku.ac.th/exceed05/api/customer/basket_list", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setBasketData(response.data);
        setShowLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        navigate("/shelf");
      });
  }, []);

  const onCancel = (event) => {
    setShowLoading(true);
    const token = localStorage.getItem("token");
    const value = event.target.value;
    axios
      .post(
        "https://ecourse.cpe.ku.ac.th/exceed05/api/customer/unreserve",
        { ID: value },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        setShowLoading(false);
        setShowAlertState("success");
        setShowAlert(true);
        setAlertMessage(response.data);
        window.setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })

      .catch((error) => {
        setShowLoading(false);
        setShowAlert(true);
        setShowAlertState("danger");
        setAlertMessage(error.response);
        window.setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      });
  };
  const basketList = basketData.map((plant) => {
    return (
      <tr className={classes.card}>
        <td>{plant.plant_name}</td>
        <td>{plant.duedate}</td>
        <td>
          <Button value={plant.ID} onClick={onCancel}>
            Cancel
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      {showLoading &&
        ReactDOM.createPortal(
          <LoadingScreen />,
          document.getElementById("modal")
        )}
      {showAlert && <Alert variant={showAlertState}>{alertMessage}</Alert>}

      <div className="customerBasket">
        <h1 className="titleBasket"> CUSTOMER BASKET</h1>
        <Container className="plantItemBox">
          <table className={classes.table}>
            <tr>
              <th>Plant Name</th>
              <th>DueDate</th>
            </tr>
            {basketList}
          </table>
        </Container>
      </div>
    </Fragment>
  );
};

export default BasketItem;
