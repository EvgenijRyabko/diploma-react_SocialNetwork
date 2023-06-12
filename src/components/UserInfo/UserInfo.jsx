import React, { useEffect, useRef } from 'react';
import ImageCrop from '../ImageCrop/ImageCrop';
import parseDate from '../../utils/parseDate';
import defaultAvatar from '../../assets/defaultAvatar.svg';
import classes from './UserInfo.module.css';

function UserInfo({ userData, userImage, isLoading, isOwner, setAvatar = (f) => f }) {
  const modalRef = useRef();

  const showModal = () => {
    modalRef.current.classList.add('active');
  };

  return (
    <div className="grid grid-cols-[3fr_7fr] relative rounded-md bg-[#607d8b] min-w-full min-h-[300px]">
      <div className="grid p-4">
        <div className="border-2 border-slate-200 rounded-md min-w-[300px] min-h-[300px]">
          <img
            src={userImage || defaultAvatar}
            alt="userLogo"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        {isOwner && (
          <button type="button" className="py-2" onClick={showModal}>
            Изменить фото
          </button>
        )}
      </div>
      <div className="p-4">
        <header className="text-2xl">{userData?.name || 'Name'}</header>
        <p className="text-slate-300 text-xl">{userData?.status || 'Нет статуса'}</p>
        <div className="py-10">
          {userData.birth_date ? (
            <p className="text-lg">Дата рождения: {parseDate(userData.birth_date).split(' ')[0]}</p>
          ) : (
            ''
          )}
          {userData.city ? <p className="text-lg">Город: {userData.city}</p> : ''}
          {userData.education ? <p>Образование: {userData.education}</p> : ''}
        </div>
      </div>
      <ImageCrop modalRef={modalRef} setAvatar={setAvatar} userData={userData} />
    </div>
  );
}

export default UserInfo;
