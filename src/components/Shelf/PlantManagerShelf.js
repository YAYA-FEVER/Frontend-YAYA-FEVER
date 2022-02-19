import React, { Fragment } from "react";
import Shelfimg from "../../static/image/shelf.png";
import "./SingleShelf.css";

import "./ShelfHome.css"

import Plant2 from "../../static/image/plant2.png";
import Plant3 from "../../static/image/plant3.png";
import PlantPost from "./PlantPost.js";
import Pot from "./Pot";
import PotManager from "./PotManager";

const PlantManagerShelf = (props) => {
  // const {onPlantClick} = props ;
  return (
    <Fragment>
      <div className="pot">
        {props.shelfData.map((plant, idx) => {

          return (
            <a className="justify-content-center" key={idx}>
              <PotManager Id={plant.ID} booking={plant.booking} />
            </a>
          );
        })}
        <div className="free"> </div>
      </div>
      <div className="shelfimage">
        <img src={Shelfimg}/>
      </div>
    </Fragment>
  );
};

export default PlantManagerShelf;