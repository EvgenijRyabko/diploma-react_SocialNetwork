import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Middlewares
// import LoginRoute from '../middlewares/Login.middleware';
// import PrivateRoute from '../middlewares/Private.middleware';

import NavBar from '../components/NavBar/NavBar';

// Pages
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Dialogs from '../pages/Dialogs/Dialogs';
import Users from '../pages/Users/Users';
import Settings from '../pages/Settings/Settings';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/dialogs" element={<Dialogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
