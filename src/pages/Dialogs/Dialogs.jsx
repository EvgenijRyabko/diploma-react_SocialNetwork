import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../../components/NavBar/NavBar';

function Dialogs() {
  return (
    <div className="rounded-md bg-[#607d8b] min-w-full">
      <div>
        <aside>
          <div>
            <img src="" alt="user" />
            <header>Username</header>
            <p>Last message</p>
          </div>
          <div>
            <img src="" alt="user" />
            <header>Username</header>
            <p>Last message</p>
          </div>
          <div>
            <img src="" alt="user" />
            <header>Username</header>
            <p>Last message</p>
          </div>
          <div>
            <img src="" alt="user" />
            <header>Username</header>
            <p>Last message</p>
          </div>
        </aside>
        <section />
      </div>
      <HelmetProvider>
        <Helmet title="Диалоги" />
      </HelmetProvider>
    </div>
  );
}

export default Dialogs;
