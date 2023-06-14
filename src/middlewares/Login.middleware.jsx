import React from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

function LoginRoute({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('auth-token');
  const user = cookies.get('id-user');
  if (token && user) return <Navigate to={`/profile/${user}`} />;
  return children;
}

export default LoginRoute;
