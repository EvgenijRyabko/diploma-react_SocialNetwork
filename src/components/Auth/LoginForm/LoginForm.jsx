import React from 'react';
import '../Auth.css';

function LoginForm({
  login,
  password,
  error,
  setLogin = (f) => f,
  setPassword = (f) => f,
  onSignIn = (f) => f,
}) {
  return (
    <form className="form form-login">
      <fieldset>
        <legend>Please, enter your email and password for login.</legend>
        <div className="input-block">
          <label htmlFor="signin-login">Логин</label>
          <input
            value={login}
            id="signin-login"
            type="text"
            placeholder="Введите логин"
            minLength={6}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="signin-password">Пароль</label>
          <input
            value={password}
            id="signin-password"
            type="password"
            placeholder="Введите пароль"
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </fieldset>
      <button
        type="submit"
        className="bg-transparent hover:text-amber-400 text-white text-lg font-bold py-2 px-4 rounded-md duration-300"
        onClick={(e) => onSignIn(e)}
      >
        Войти
      </button>
      {error && (
        <div className="error">
          <div className="errorMessage">{error.error}</div>
        </div>
      )}
    </form>
  );
}

export default LoginForm;
