import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postProfileImage } from '../../store/actions/usersAction';
import classes from './UserInfo.module.css';

function UserInfo({ userData, isOwner }) {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState([]);

  const onSendProfile = async () => {
    await dispatch(postProfileImage({ id: userData.id, images: profileImg }));
  };

  return (
    <form
      encType="multipart/form-data"
      className="grid grid-cols-[2fr_7fr] rounded-md bg-[#607d8b] w-full min-h-[300px]"
    >
      <div className="grid grid-rows-[8fr_4fr]">
        <img alt="userLogo" />
        {isOwner && (
          <div className="p-2">
            <label htmlFor="formFileSm" className="mb-2 inline-block text-neutral-300" />
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-300 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-100 focus:shadow-te-primary focus:outline-none"
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
      <div>
        <header>{userData?.name || 'Name'}</header>
        <p>{userData?.status || ''}</p>
        <p>{userData['birth-date'] || ''}</p>
      </div>
    </form>
  );
}

export default UserInfo;
