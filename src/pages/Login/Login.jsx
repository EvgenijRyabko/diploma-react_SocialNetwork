import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import { rand } from 'random-bytes-js';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { signIn as signInAction, signUp as signUpAction } from '../../store/actions/authActions';
import bgImage from '../../assets/loginBG.svg';
import './Login.css';
import { Preloader } from '../../components/Preloader/Preloader';

function Login() {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [username, setUsername] = useState('');
  const signUp = useRef();
  const signIn = useRef();

  const { isLoading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookies = ['auth-token', 'user-id'];

  const [, setCookie, removeCookie] = useCookies(cookies);

  const encryptPass = (pass = '') => {
    let iv = rand(32);

    // If length bytes > 32 then trim to 32
    if (iv.length > 32) iv = iv.slice(0, 32);

    const AesKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_API_KEY);
    const byteIv = CryptoJS.enc.Hex.parse(iv);
    const encryptedStringHex = CryptoJS.AES.encrypt(pass, AesKey, {
      iv: byteIv,
      mode: CryptoJS.mode.CBC,
      format: CryptoJS.format.Hex,
    }).ciphertext;

    const hex = CryptoJS.enc.Hex.stringify(byteIv);

    return `${hex}:${encryptedStringHex.toString()}`;
  };

  // signIn :: (Event) -> void
  const onSignIn = async (e) => {
    e.preventDefault();

    // Get data from server
    const { token, id_user: idUser } = await dispatch(
      signInAction({ password: encryptPass(password), login }),
    );

    if (error) Swal.fire(error);

    // If auth success then redirect to main page
    if (token) {
      for (let i = 0; i < cookies.length; i++) removeCookie(cookies[i], { path: '/' });

      setCookie('auth-token', token, { path: '/' });
      setCookie('id-user', idUser, { path: '/' });

      navigate(`/profile/${idUser}`);
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();

    await dispatch(signUpAction({ username, password: encryptPass(password), login }));

    signIn.current.classList.add('is-active');
    signUp.current.classList.remove('is-active');
  };

  return (
    <section className="forms-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="forms">
        <div ref={signIn} className="form-wrapper is-active">
          <button
            type="button"
            className="switcher switcher-login"
            onClick={() => {
              setLogin('');
              setPassword('');
              setUsername('');
              signIn.current.classList.add('is-active');
              signUp.current.classList.remove('is-active');
            }}
          >
            ВХОД
            <span className="underline" />
          </button>
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded-full"
              onClick={(e) => onSignIn(e)}
            >
              Войти
            </button>
          </form>
        </div>
        <div ref={signUp} className="form-wrapper">
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => {
              setLogin('');
              setPassword('');
              setUsername('');
              signIn.current.classList.remove('is-active');
              signUp.current.classList.add('is-active');
            }}
          >
            РЕГИСТРАЦИЯ
            <span className="underline" />
          </button>
          <form className="form form-signup">
            <fieldset>
              <legend>
                Please, enter your email, password and password confirmation for sign up.
              </legend>
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-lg rounded-full"
              onClick={(e) => {
                onSignUp(e);
              }}
            >
              Зарегестрироваться
            </button>
          </form>
        </div>
      </div>

      <HelmetProvider>
        <Helmet title="Авторизация" />
      </HelmetProvider>
    </section>
  );
}

export default Login;
