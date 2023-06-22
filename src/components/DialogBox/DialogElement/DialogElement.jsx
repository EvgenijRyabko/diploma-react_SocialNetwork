import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import parseDate from '../../../utils/parseDate';
import { getUserById } from '../../../store/actions/usersActions';
import defaultAvatar from '../../../assets/defaultAvatar.svg';

function DialogElement({
  id,
  name,
  lastMessage,
  createdAt,
  setDialog = (f) => f,
  setName = (f) => f,
}) {
  const dispatch = useDispatch();
  const checkLength = lastMessage.length > 15;
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const res = await dispatch(getUserById(id));

      setPhoto(res?.profile_img ? `${import.meta.env.VITE_APP_STORAGE}${res.profile_img}` : null);
    })();
  }, [id]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="grid grid-cols-[3fr_4fr] w-full my-2"
      onClick={() => {
        setDialog(id);
        setName(name);
      }}
    >
      <img
        src={photo || defaultAvatar}
        alt="user"
        className="w-[130px] h-[130px] rounded-[50%] border-2 border-slate-100"
      />
      <div>
        <header className="text-2xl">{name}</header>
        <p className="text-lg text-slate-300">
          {checkLength ? `${lastMessage.substr(0, 15)}...` : lastMessage || ''}
        </p>
        <p className="text-lg text-slate-300">{parseDate(createdAt)}</p>
      </div>
    </div>
  );
}

export default DialogElement;
