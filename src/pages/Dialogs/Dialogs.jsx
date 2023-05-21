import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../../components/NavBar/NavBar';

function Dialogs() {
  return (
    <div className="grid grid-cols-[2fr_10fr] gap-6 p-4 min-h-screen min-w-full bg-slate-500">
      <NavBar />
      <div className="h-screen bg-slate-200 rounded-md">Content</div>

      <HelmetProvider>
        <Helmet title="Диалоги" />
      </HelmetProvider>
    </div>
  );
}

export default Dialogs;
