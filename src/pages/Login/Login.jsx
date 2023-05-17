import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginPreview from '../../components/LoginPreview/LoginPreview';
import classes from './Login.module.css';

function Login() {
  return (
    <div className={classes.container}>
      <LoginPreview />
      <LoginForm />
    </div>
  );
}

export default Login;
