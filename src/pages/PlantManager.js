import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";
import { checkAdminPermission } from "../service/Authentication";

const PlantManager = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkAdminPermission(navigate);
  }, []);

  return (
    <Fragment>
      <NaviBar />
      <div>PlantManager</div>
    </Fragment>
  );
};

export default PlantManager;
