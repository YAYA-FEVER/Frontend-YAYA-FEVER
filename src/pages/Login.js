import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import classes from './Login.module.css'

const Login = () => {
  return (
    <div className={classes.container}>
      <LoginForm />
    </div>
  );
};

export default Login;
