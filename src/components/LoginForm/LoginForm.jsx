import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './LoginForm.module.css';

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    navigate('/profile');
  };

  return (
    <form className={classes.form}>
      <div className={classes.inputAreas}>
        <input placeholder="Введите логин" type="text" />
        <input placeholder="Введите пароль" type="password" />
      </div>
      <button
        className={classes.button}
        type="submit"
        onClick={(e) => {
          onSubmit(e);
        }}
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
