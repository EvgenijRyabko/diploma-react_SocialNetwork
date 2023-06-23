import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { encryptPass } from '../../utils/AES';
import { signIn as signInAction, signUp as signUpAction } from '../../store/actions/authActions';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegistrationForm from '../../components/Auth/RegistrationForm/RegistrationForm';
import './Login.css';

function Login() {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [username, setUsername] = useState('');
  const signUp = useRef();
  const signIn = useRef();

  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookies = ['auth-token', 'id-user'];

  const [, setCookie, removeCookie] = useCookies(cookies);

  // signIn :: (Event) -> void
  const onSignIn = async (e) => {
    e.preventDefault();

    // Get data from server
    const res = await dispatch(
      signInAction({ password: password ? encryptPass(password) : '', login }),
    );

    // If auth success then redirect to main page
    if (res?.token) {
      for (let i = 0; i < cookies.length; i++) removeCookie(cookies[i], { path: '/' });

      setCookie('auth-token', res.token, { path: '/' });
      setCookie('id-user', res.id_user, { path: '/' });

      navigate(`/profile/${res.id_user}`);
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();

    await dispatch(signUpAction({ username, password: encryptPass(password), login }));

    signIn.current.classList.add('is-active');
    signUp.current.classList.remove('is-active');
  };

  const switchPage = async (e) => {
    await dispatch({ type: 'CLEAR_ERROR' });
    setLogin('');
    setPassword('');
    setUsername('');

    if (signIn.current?.classList.contains('is-active')) {
      signIn.current.classList.remove('is-active');
      signUp.current.classList.add('is-active');
    } else {
      signIn.current.classList.add('is-active');
      signUp.current.classList.remove('is-active');
    }
  };

  return (
    <section className="forms-section">
      <div className="forms">
        <div ref={signIn} className="form-wrapper is-active">
          <button type="button" className="switcher switcher-login" onClick={switchPage}>
            ВХОД
            <span className="underline" />
          </button>
          <LoginForm
            login={login}
            password={password}
            error={error}
            setLogin={setLogin}
            setPassword={setPassword}
            onSignIn={onSignIn}
          />
        </div>
        <div ref={signUp} className="form-wrapper">
          <button type="button" className="switcher switcher-signup" onClick={switchPage}>
            РЕГИСТРАЦИЯ
            <span className="underline" />
          </button>
          <RegistrationForm
            username={username}
            login={login}
            password={password}
            error={error}
            setUsername={setUsername}
            setLogin={setLogin}
            setPassword={setPassword}
            onSignUp={onSignUp}
          />
        </div>
      </div>

      <HelmetProvider>
        <Helmet title="Авторизация" />
      </HelmetProvider>
    </section>
  );
}

export default Login;
