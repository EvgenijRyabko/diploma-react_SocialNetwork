import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Middlewares
// import LoginRoute from '../middlewares/Login.middleware';
// import PrivateRoute from '../middlewares/Private.middleware';

// Pages
import Profile from '../pages/Profile';
import Login from '../pages/Login/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
