import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import loginBG from '../../assets/loginBG.svg';
import appLogo from '../../assets/react.svg';
import classes from './Login.module.css';

function Login() {
  return (
    <div className={classes.container}>
      <img className={classes.wrapper} src={loginBG} alt="none" />
      <div className={classes.preview}>
        <img className={classes.logo} src={appLogo} alt="Logo" />
        <header className={classes.title}>Social Network</header>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
