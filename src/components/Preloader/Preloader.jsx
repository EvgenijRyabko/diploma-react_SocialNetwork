import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import preloaderGif from '../../assets/loading.gif';
import classes from './Preloader.module.css';

function Preloader({ loading }) {
  const [dotted, setDotted] = useState('');
  const preloaderPortal = document.createElement('div');

  useLayoutEffect(() => {
    let timeout;

    if (loading) {
      preloaderPortal.id = 'Preloader';
      preloaderPortal.className = classes.Preloader;
      document.body.appendChild(preloaderPortal);

      if (dotted.length < 3) timeout = setTimeout(() => setDotted(`${dotted}.`), 800);
      else setDotted('');
    }

    return () => {
      if (loading) document.body.removeChild(preloaderPortal);
      clearTimeout(timeout);
    };
  }, [loading]);

  return ReactDOM.createPortal(
    <div>
      <img src={preloaderGif} alt="preloader" />
      <p className="mt-2">Загрузка{dotted}</p>
    </div>,
    preloaderPortal,
  );
}

export { Preloader };
