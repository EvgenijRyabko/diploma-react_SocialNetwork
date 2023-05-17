import React from 'react';
import loginBG from '../../assets/loginBG.svg';
import appLogo from '../../assets/react.svg';
import classes from './LoginPreview.module.css';

function LoginPreview() {
  return (
    <>
      <img className={classes.wrapper} src={loginBG} alt="none" />
      <div className={classes.preview}>
        <img className={classes.logo} src={appLogo} alt="Logo" />
        <header className={classes.title}>Social Network</header>
      </div>
    </>
  );
}

export default LoginPreview;
