import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../../components/NavBar/NavBar';

function Settings() {
  return (
    <div className="h-screen bg-slate-200 rounded-md">
      Settings
      <HelmetProvider>
        <Helmet title="Настройки" />
      </HelmetProvider>
    </div>
  );
}

export default Settings;
