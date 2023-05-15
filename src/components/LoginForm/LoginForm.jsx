import React from 'react';
import classes from './LoginForm.module.css';

function LoginForm() {
  return (
    <form className={classes.form}>
      <div className={classes.inputAreas}>
        <input placeholder="Введите логин" type="text" />
        <input placeholder="Введите пароль" type="password" />
      </div>
      <button className={classes.button} type="submit">
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
