import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  getUsers,
  getUserFollowers,
  subscribeToUser,
  unSubscribeUser,
} from '../../store/actions/usersActions';
import defaultAvatar from '../../assets/defaultAvatar.svg';

function Users() {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const [relations, setRelations] = useState();
  const users = useSelector((state) => state.users.users);

  const profileId = parseInt(cookie.get('id-user'));

  useEffect(() => {
    dispatch(getUsers());

    (async () => {
      const res = await dispatch(getUserFollowers(profileId));

      setRelations(res);
    })();
  }, []);

  const checkSubscribe = (userId) => {
    if (relations) {
      if (relations.followers.find((el) => el === userId)) return true;
      if (relations.friends.find((el) => el === userId)) return true;
    }

    return false;
  };

  const unSubscribe = async (userId) => {
    await dispatch(unSubscribeUser(profileId, userId));
    const res = await dispatch(getUserFollowers(profileId));

    setRelations(res);
  };

  const Subscribe = async (userId) => {
    await dispatch(subscribeToUser(profileId, userId));
    const res = await dispatch(getUserFollowers(profileId));

    setRelations(res);
  };

  return (
    <div className="bg-[#607d8b] rounded-md text-slate-200">
      {users.map((el, id) => (
        <section key={id} className="grid p-2 min-w-full min-h-[200px]">
          <div className="grid grid-cols-[1fr_5fr_2fr] gap-6 border-2 rounded-md">
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
            {profileId !== el.id ? (
              <div className="grid w-full h-full">
                {checkSubscribe(el.id) ? (
                  <button
                    type="button"
                    className="p-2 h-3/6 min-h-[75px] border-2 border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-black duration-300 place-self-center justify-self-center"
                    onClick={() => unSubscribe(el.id)}
                  >
                    Отписаться
                  </button>
                ) : (
                  <button
                    type="button"
                    className="p-2 h-3/6 min-h-[75px] border-2 border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-black duration-300 place-self-center justify-self-center"
                    onClick={() => Subscribe(el.id)}
                  >
                    Подписаться
                  </button>
                )}
              </div>
            ) : (
              <div />
            )}
          </div>
        </section>
      ))}

      <HelmetProvider>
        <Helmet title="Пользователи" />
      </HelmetProvider>
    </div>
  );
}

export default Users;
