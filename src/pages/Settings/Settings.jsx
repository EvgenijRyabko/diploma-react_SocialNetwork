import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../../components/NavBar/NavBar';

function Settings() {
  return (
    <div className="rounded-md bg-[#607d8b] min-w-full">
      <div className="p-4">
        <button
          type="button"
          className="text-rose-500 font-semibold border-2 border-rose-500 min-w-[300px] h-2/5 rounded-md place-self-center hover:bg-rose-500 hover:text-slate-200 transition duration-300"
        >
          Удалить пользователя
        </button>
      </div>
      <HelmetProvider>
        <Helmet title="Настройки" />
      </HelmetProvider>
    </div>
  );
}

export default Settings;
