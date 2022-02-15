import axios from "axios";
import { useNavigate } from "react-router-dom";

export const checkAdminPermission = (navigate) => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:8000/getpermission", {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      console.log(response.response);
    })
    .catch((error) => {
      console.log(error.response.data.detail);
      if (error.response.data.detail == "Signature has expired") {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
      }
      navigate("/shelf");
    });
};

export const checkTokenExpired = (navigate) => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:8000/getpermission", {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      console.log(response.response);
    })
    .catch((error) => {
      console.log(error.response.data.detail);
      if (error.response.data.detail == "Signature has expired") {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/shelf");
      }
    });
};
