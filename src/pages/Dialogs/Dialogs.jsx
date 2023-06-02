import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../../components/NavBar/NavBar';

function Dialogs() {
  return (
    <div className="h-screen bg-slate-200 rounded-md">
      Content
      <HelmetProvider>
        <Helmet title="Диалоги" />
      </HelmetProvider>
    </div>
  );
}

export default Dialogs;
