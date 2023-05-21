import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { getUsers } from '../../store/actions/usersAction';
import NavBar from '../../components/NavBar/NavBar';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="grid grid-cols-[2fr_10fr] gap-6 p-4 min-h-screen min-w-full bg-[#455a64]">
      <NavBar />
      <div className="bg-[#607d8b] rounded-md text-slate-200">
        {users.map((el, id) => (
          <div key={id} className="grid grid-cols-[2fr_6fr] min-w-full m-4 min-h-[200px]">
            <div>
              <img alt="user-img" />
            </div>
            <div>
              <NavLink to={`/profile/${el.id}`}>{el.name}</NavLink>
              <p>{el.status}</p>
              <p>{el['birth-date']}</p>
            </div>
          </div>
        ))}
      </div>

      <HelmetProvider>
        <Helmet title="Пользователи" />
      </HelmetProvider>
    </div>
  );
}

export default Users;
