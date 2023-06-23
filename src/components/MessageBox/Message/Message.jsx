import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import defaultAvatar from '../../../assets/defaultAvatar.svg';
import { getUserById } from '../../../store/actions/usersActions';
import parseDate from '../../../utils/parseDate';

function Message({ fromMe = false, id, name, text, createdAt }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState();

  const userId = cookies.get('id-user');

  useEffect(() => {
    (async () => {
      const res = await dispatch(getUserById(id));
      setPhoto(res?.profile_img ? `${import.meta.env.VITE_APP_STORAGE}${res.profile_img}` : null);
    })();
  }, [id]);

  return (
    <div className="my-2">
      {fromMe === true ? (
        <div className="grid grid-cols-[6fr_180px] w-full items-end">
          <div className="w-full h-full text-end">
            <header className="text-2xl text-slate-300">{name}</header>
            <p className="text-sm text-slate-300">{parseDate(createdAt)}</p>
            <p className="text-xl">{text}</p>
          </div>
          <img
            src={photo || defaultAvatar}
            alt="none"
            className="w-[150px] h-[150px] rounded-[50%] border-2 border-slate-100 place-self-center"
          />
        </div>
      ) : (
        <div className="grid grid-cols-[180px_6fr] w-full">
          <img
            src={photo || defaultAvatar}
            alt="none"
            className="w-[150px] h-[150px] rounded-[50%] border-2 border-slate-100 place-self-center"
          />
          <div>
            <header className="text-2xl text-slate-300">{name}</header>
            <p className="text-sm text-slate-300">{parseDate(createdAt)}</p>
            <p className="text-xl">{text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
