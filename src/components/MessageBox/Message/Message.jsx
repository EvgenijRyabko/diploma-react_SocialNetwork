import React from 'react';
import defaultAvatar from '../../../assets/defaultAvatar.svg';
import parseDate from '../../../utils/parseDate';

function Message({ fromMe = false, name, text, createdAt }) {
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
            src={defaultAvatar}
            alt="none"
            className="w-[150px] h-[150px] rounded-[50%] border-2 border-slate-100 place-self-center"
          />
        </div>
      ) : (
        <div className="grid grid-cols-[180px_6fr] w-full">
          <img
            src={defaultAvatar}
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
