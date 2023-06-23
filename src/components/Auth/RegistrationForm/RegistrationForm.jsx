import React from 'react';
import '../Auth.css';

function RegistrationForm({
  username,
  login,
  password,
  error,
  setUsername = (f) => f,
  setLogin = (f) => f,
  setPassword = (f) => f,
  onSignUp = (f) => f,
}) {
  return (
    <form className="form form-signup">
      <fieldset>
        <legend>Please, enter your email, password and password confirmation for sign up.</legend>
        <div className="input-block">
          <label htmlFor="signup-name">Имя</label>
          <input
            value={username}
            id="signup-name"
            type="text"
            placeholder="Введите имя пользователя"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="signup-login">Логин</label>
          <input
            value={login}
            id="signup-login"
            type="text"
            placeholder="Введите логин"
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="signup-password">Пароль</label>
          <input
            value={password}
            id="signup-password"
            type="password"
            placeholder="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </fieldset>
      <button
        type="submit"
        className="bg-transparent hover:text-amber-400 text-white text-lg font-bold py-2 px-4 rounded-md duration-300"
        onClick={(e) => {
          onSignUp(e);
        }}
      >
        Создать
      </button>
      {error && (
        <div className="error">
          <div className="errorMessage">{error.error}</div>
        </div>
      )}
    </form>
  );
}

export default RegistrationForm;
