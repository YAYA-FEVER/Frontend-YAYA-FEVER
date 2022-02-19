import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";

import { checkAdminPermission } from "../service/Authentication";

import { Container , Row , Col} from "react-bootstrap";
import SingleShelf from "../components/Shelf/SingleShelf";


const PlantManager = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkAdminPermission(navigate);
  }, []);

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
