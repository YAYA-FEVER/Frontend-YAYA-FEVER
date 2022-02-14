import React from 'react'
import RegisterForm from '../components/Auth/RegisterForm';
import classes from './Register.module.css';
const Register = () => {
  return (
      <div className={classes.container}>
          <RegisterForm/>
      </div>
    
  )
}

export default Register;