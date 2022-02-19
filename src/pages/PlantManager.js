import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import { Container , Row , Col} from "react-bootstrap";
import SingleShelf from "../components/Shelf/SingleShelf";

const PlantManager = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:8000/getpermission", {
      "headers":
      {'Authorization': "Bearer " + token}
    }).then((response) => {
      console.log(response.response)
    }).catch((error) => {
      console.log(error.response.data.detail);
      navigate('/shelf')
    })

  }, [])

  return (
      <Container>
          <div className="header">PLANT MANAGER</div>
          <Row className="firstLine">
              <Col>
                  <SingleShelf />
              </Col>
              <Col>
                  <SingleShelf />
              </Col> 
          </Row>
          <Row className="secondLine">
              <Col>
                  <SingleShelf />
              </Col> 
              <Col>
                  <SingleShelf />
              </Col> 
          </Row>
      </Container>
  );
};

export default PlantManager;
