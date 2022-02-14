import React, { Fragment, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [usernameIn, setUsername] = useState("");
  const [passwordIn, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidForm, setValidForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const registerHandler = (event) => {
    event.preventDefault();
    if (passwordIn != confirmPassword) {
      setErrorMessage("password not match");
      setValidForm(false);
    } else {
      const payload = {
        username: usernameIn,
        password: passwordIn,
      };
      axios
        .post("http://localhost:8000/register", payload)
        .then((response) => {
          setValidForm(true);
          navigate("/login");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.detail);
          setValidForm(false)
        });
    }
  };

  return (
    <Fragment>
      <h2>Register</h2>
      {!isValidForm && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={registerHandler}>
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
        <Form.Group
          className="mb-3"
          controlId="formComfirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
          <Form.Label>Comfirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Link to="/login">
          <p>login</p>
        </Link>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Fragment>
  );
};

export default RegisterForm;
