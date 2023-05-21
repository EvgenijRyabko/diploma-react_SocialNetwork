import React from 'react';
import classes from './LoginForm.module.css';

function LoginForm({ signIn = (f) => f, setPassword = (f) => f, setLogin = (f) => f }) {
  return (
    <form className={classes.form}>
      <div className={classes.inputAreas}>
        <input placeholder="Введите логин" type="text" onChange={(e) => setLogin(e.target.value)} />
        <input
          placeholder="Введите пароль"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className={classes.button}
        type="submit"
        onClick={(e) => {
          signIn(e);
        }}
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
