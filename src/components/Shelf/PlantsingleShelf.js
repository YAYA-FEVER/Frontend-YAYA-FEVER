import React, { Fragment, useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import SingleShelf from "./SingleShelf";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import PlantManagerShelf from "./PlantManagerShelf";
import { useNavigate } from "react-router-dom";

const DUMMY_DATA = [
  [
    { ID: 1, booking: 0 },
    { ID: 2, booking: 1 },
    { ID: 3, booking: 0 },
  ],
  [
    { ID: 4, booking: 0 },
    { ID: 5, booking: 0 },
    { ID: 6, booking: 1 },
  ],
  [
    { ID: 7, booking: 0 },
    { ID: 8, booking: 0 },
    { ID: 9, booking: 1 },
  ],
  [
    { ID: 10, booking: 0 },
    { ID: 11, booking: 0 },
    { ID: 12, booking: 1 },
  ],
  [
    { ID: 13, booking: 0 },
    { ID: 14, booking: 0 },
    { ID: 15, booking: 1 },
  ],
  [
    { ID: 16, booking: 0 },
    { ID: 17, booking: 0 },
    { ID: 18, booking: 1 },
  ],
  [
    { ID: 19, booking: 1 },
    
    
  ],
];



const PlantSingleShelf = () => {
  const [plantList,setPlantList] = useState([]);
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get("https://ecourse.cpe.ku.ac.th/exceed05/api/customer/shelf/plant")
    .then((response) => {
      setPlantList(response.data)
      })
    
  })
  const allShelf = plantList.map((shelf) => {
    return (
      <Col>
        <PlantManagerShelf shelfData={shelf} />
      </Col>
    );
  });

  const addPlantHandler = () => {
      navigate('/addPlant')
  }

  return (
    <Container>
      <div className="header">Plant Manager</div>
      <Button onClick={addPlantHandler} className="plus-button">+</Button>
      <Row lg={1} md={1} sm={1} xl={2}>
        {allShelf}
      </Row>
    </Container>
  );
};

export default PlantSingleShelf;
