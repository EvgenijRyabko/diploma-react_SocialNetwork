import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Middlewares
import LoginRoute from '../middlewares/Login.middleware';
import PrivateRoute from '../middlewares/Private.middleware';

// Pages
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Dialogs from '../pages/Dialogs/Dialogs';
import Users from '../pages/Users/Users';
import Settings from '../pages/Settings/Settings';
import Friends from '../pages/Friends/Friends';

// Components
import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';

function Router() {
  const App = (
    <PrivateRoute>
      <Header />
      <div className="grid grid-cols-[3fr_9fr] gap-6 p-4 min-h-screen min-w-[1200px] bg-[#455a64] text-slate-100">
        <NavBar />
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </PrivateRoute>
  );

  const LoginPage = (
    <LoginRoute>
      <Login />
    </LoginRoute>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={LoginPage} />
        <Route path="/*" element={App} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
