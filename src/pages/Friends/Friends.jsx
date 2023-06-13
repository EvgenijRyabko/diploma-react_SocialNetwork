import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { getUserFriends } from '../../store/actions/usersActions';
import defaultAvatar from '../../assets/defaultAvatar.svg';

function Friends() {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);

  const profileId = parseInt(cookie.get('id-user'));

  useEffect(() => {
    (async () => {
      const res = await dispatch(getUserFriends(profileId));

      setFriends(res);
    })();
  }, []);

  return (
    <div className="bg-[#607d8b] rounded-md text-slate-200">
      <header className="text-4xl m-6">Друзья</header>
      {friends.map((el, id) => (
        <section key={id} className="grid p-2 min-w-full min-h-[200px]">
          <div className="grid grid-cols-[1fr_5fr] gap-6 border-2 rounded-md">
            <div className="grid mx-2">
              <img
                src={
                  el?.profile_img
                    ? import.meta.env.VITE_APP_STORAGE + el.profile_img
                    : null || defaultAvatar
                }
                alt="user-img"
                className="rounded-[50%] min-w-[150px] w-[150px] h-[150px] min-h-[150px] border-2 object-cover justify-self-center place-self-center"
              />
            </div>
            <div>
              <NavLink to={`/profile/${el.id}`} className="text-2xl">
                {el.name}
              </NavLink>
              <p className="text-lg text-slate-300">{el.status}</p>
              <p>{el['birth-date']}</p>
            </div>
          </div>
        </section>
      ))}

      <HelmetProvider>
        <Helmet title="Пользователи" />
      </HelmetProvider>
    </div>
  );
}

export default Friends;
