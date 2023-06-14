import React from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('auth-token');
  const user = cookies.get('id-user');
  if (token && user) return children;
  return <Navigate to="/" />;
}

export default PrivateRoute;
