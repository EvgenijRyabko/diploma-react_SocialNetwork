import React from 'react';

function UserInfo({ userData }) {
  return (
    <div className="grid grid-cols-[2fr_7fr] rounded-md bg-[#607d8b] w-full min-h-[300px]">
      <div>
        <img alt="userLogo" />
      </div>
      <div>
        <header>{userData?.name || 'Name'}</header>
        <p>{userData?.status || ''}</p>
        <p>{userData['birth-date'] || ''}</p>
      </div>
    </div>
  );
}

export default UserInfo;
