import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { postProfileImage } from '../../store/actions/usersActions';
import parseDate from '../../utils/parseDate';
import defaultAvatar from '../../assets/defaultAvatar.svg';
import classes from './UserInfo.module.css';

function UserInfo({ userData, userImage, isLoading, isOwner, setAvatar = (f) => f }) {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState();

  const onSendProfile = async () => {
    const formData = new FormData();

    formData.append('file', upload);

    const res = await dispatch(postProfileImage({ userId: userData.id, formData }));

    setAvatar(import.meta.env.VITE_APP_STORAGE + res);
  };

  const showInputModal = () => {
    let inputFormHtml = '<form className="grid gap-2 p-2" encType="multipart/form-data">';
    inputFormHtml +=
      '<label htmlFor="formFileSm" className="mb-2 inline-block text-neutral-300" />';
    inputFormHtml +=
      '<input className={classes.profileImageInput} id="formFileSm" type="file" name="photo" accept=".jpg, .jpeg, .png" onChange={(e)=>setUpload(e.target.files[0])} />';
    inputFormHtml +=
      '<button type="button" onClick={onSendProfile} className="w-3/6 justify-self-center bg-transparent hover:bg-amber-200 text-amber-200 font-semibold hover:text-black py-2 px-4 border border-amber-200 rounded">Send</button></form>';
    Swal.fire('', inputFormHtml);
  };

  return (
    <div className="grid grid-cols-[3fr_7fr] relative rounded-md bg-[#607d8b] min-w-full min-h-[300px]">
      <div className="grid p-4">
        <div className="border-2 border-slate-200 rounded-md min-w-[350px] min-h-[400px]">
          <img
            src={userImage || defaultAvatar}
            alt="userLogo"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        {isOwner && (
          <button type="button" onClick={showInputModal}>
            Изменить фото
          </button>
        )}
      </div>
      <div className="p-4">
        <header className="text-3xl">{userData?.name || 'Name'}</header>
        <p className="text-slate-300">{userData?.status || 'Нет статуса'}</p>
        <div className="py-10">
          {userData.birth_date ? (
            <p>Дата рождения: {parseDate(userData.birth_date).split(' ')[0]}</p>
          ) : (
            ''
          )}
          {userData.city ? <p>Город: {userData.city}</p> : ''}
          {userData.education ? <p>Образование: {userData.education}</p> : ''}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
