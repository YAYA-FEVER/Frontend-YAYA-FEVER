import React, { Fragment, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import classes from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [usernameIn, setUsername] = useState("");
  const [passwordIn, setPassword] = useState("");
  const [isValidForm, setValidForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();
    const payload = {
      username: usernameIn,
      password: passwordIn,
    };
    axios
      .post("http://localhost:8000/login", payload)
      .then((response) => {
        setValidForm(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", usernameIn);
        navigate("/shelf");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.detail);
        setValidForm(false);
      });
  };

  return (
    <Fragment>
      {!isValidForm && <Alert variant="danger">{errorMessage}</Alert>}
      <h2>Login</h2>
      <Form onSubmit={loginHandler}>
        <Form.Group
          className="mb-3"
          controlId="formBasicUsername"
          value={usernameIn}
          onChange={(e) => setUsername(e.target.value)}
        >
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          value={passwordIn}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Link to="/register" className={classes.register_link}>
          <p>register</p>
        </Link>
        <Button variant="primary" type="submit" className={classes.submit_btn}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default LoginForm;
