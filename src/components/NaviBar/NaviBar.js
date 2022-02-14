import React, { useEffect, useState } from "react";
import classes from "./NaviBar.module.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NaviBar = () => {
  const [permission, setPermission] = useState(0);

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/getpermission", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setPermission(1);
      })
      .catch((error) => {
        setPermission(0);
      });
  }, []);

  const checkIsLogin = () => {
    let naviLink = <Link to="/login">LOGIN</Link>;
    if (localStorage.getItem("token")) {
      const name = localStorage.getItem("name");
      naviLink = (
        <NavDropdown id="nav-dropdown-dark-example" title={`Hi ${name}`}>
          <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    }
    return naviLink;
  };

  return (
    <Navbar className={classes.nav_bar}>
      <Container>
        <Navbar.Brand>
          <Link to="/shelf" className={classes.title}>
            SHELF
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {permission ? (
              <Link
                to="/plantManager"
                className={`justify-content-end ${classes.plant_manager}`}
              >
                <p>PlantManager</p>
              </Link>
            ) : <></>}
            {checkIsLogin()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NaviBar;
