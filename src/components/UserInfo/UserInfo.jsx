import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postProfileImage } from '../../store/actions/usersAction';
import defaultAvatar from '../../assets/defaultAvatar.svg';
import classes from './UserInfo.module.css';

function UserInfo({ userData, isOwner }) {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState([]);
  const image = null;

  const onSendProfile = async () => {
    await dispatch(postProfileImage({ id: userData.id, images: profileImg }));
  };

  return (
    <form
      encType="multipart/form-data"
      className="grid grid-cols-[3fr_7fr] rounded-md bg-[#607d8b] w-full min-h-[300px]"
    >
      <div className="grid grid-rows-[8fr_4fr] p-4">
        <img
          src={image || defaultAvatar}
          alt="userLogo"
          className="border-2 border-slate-200 rounded-md"
        />
        {isOwner && (
          <div className="p-2">
            <label htmlFor="formFileSm" className="mb-2 inline-block text-neutral-300" />
            <input
              className={classes.profileImageInput}
              id="formFileSm"
              type="file"
              multiple="multiple"
              name="photo"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setProfileImg(e.target.files)}
            />
            <button type="button" onClick={onSendProfile}>
              Send
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <header className="text-3xl">{userData?.name || 'Name'}</header>
        <p className="text-slate-300">{userData?.status || 'Нет статуса'}</p>
        <div className="py-10">
          <p>Дата рождения: {userData['birth-date'] || '2003.04.05'}</p>
          <p>{userData['birth-date'] || '2003.04.05'}</p>
          <p>{userData['birth-date'] || '2003.04.05'}</p>
        </div>
      </div>
    </form>
  );
}

export default UserInfo;
