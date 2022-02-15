import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../components/NaviBar/NaviBar";

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
      if (error.response.data.detail == "Signature has expired"){
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      }
      navigate('/shelf')
    })

  }, [])

  return (
    <Fragment>
      <NaviBar />
      <div>PlantManager</div>
    </Fragment>
  );
};

export default PlantManager;
