import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import { rand } from 'random-bytes-js';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { signIn as signInAction } from '../../store/actions/authActions';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginPreview from '../../components/LoginPreview/LoginPreview';
import classes from './Login.module.css';
import { Preloader } from '../../components/Preloader/Preloader';

function Login() {
  const [password, setPassword] = useState();
  const [login, setLogin] = useState();

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

  return (
    <div className={classes.container}>
      <LoginPreview />
      <LoginForm signIn={onSignIn} setPassword={setPassword} setLogin={setLogin} />

      <Preloader loading={isLoading} />

      <HelmetProvider>
        <Helmet title="Авторизация" />
      </HelmetProvider>
    </div>
  );
}

export default Login;
