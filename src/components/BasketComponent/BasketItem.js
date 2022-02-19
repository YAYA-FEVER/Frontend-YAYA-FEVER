import React from "react";
import { Card, Container } from "react-bootstrap";

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
    plant_name: "plant 3",
  },
];

const BasketItem = () => {
  const basketList = DUMMY_DATA.map((plant) => {
    return (
      <Card className="plantItem">
        {plant.duedate} {plant.plant_name}
      </Card>
    );
  });
  return (
    <div className="customerBasket">
      <h1 className="titleBasket"> CUSTOMER BASKET</h1>
      <Container className="plantItemBox">
        <i class="fa-solid fa-tree-deciduous"></i>
        {basketList}
      </Container>
      <button type="submit" onClick={console.log("checkout")}>
        Checkout
      </button>
    </div>
  );
};

export default BasketItem;
