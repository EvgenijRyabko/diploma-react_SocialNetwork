import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { sendMessage } from '../../store/actions/dialogsActions';
import ImageCrop from '../ImageCrop/ImageCrop';
import parseDate from '../../utils/parseDate';
import defaultAvatar from '../../assets/defaultAvatar.svg';
import classes from './UserInfo.module.css';

function UserInfo({ userData, userImage, isLoading, isOwner, setAvatar = (f) => f }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const modalRef = useRef();

  const userId = cookies.get('id-user');

  const showModal = () => {
    modalRef.current.classList.add('active');
  };

  const onSendMessage = async () => {
    const res = await Swal.fire({
      title: 'Введите сообщение',
      input: 'textarea',
      color: 'white',
      background: '#607d8b',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      cancelButtonColor: '#f43f5e',
      confirmButtonColor: '#10b981',
      inputValidator: (value) => {
        if (!value) {
          return 'Сообщение не должно быть пустым!';
        }
      },
      preConfirm: (text) => {
        dispatch(sendMessage(userId, userData.id, text));
      },
    });

    if (res.isConfirmed) {
      Swal.fire({
        timer: 2000,
        showConfirmButton: false,
        background: '#607d8b',
        icon: 'success',
      });
    }
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
          <button
            type="button"
            className="py-2 hover:text-amber-400 duration-300"
            onClick={showModal}
          >
            Изменить фото
          </button>
        )}
        {isOwner || (
          <button
            type="button"
            className="py-2 hover:text-amber-400 duration-300"
            onClick={onSendMessage}
          >
            Написать сообщение
          </button>
        )}
      </div>
      <div className="p-4">
        <header className="text-2xl">{userData?.name || 'Name'}</header>
        <p className="text-slate-300 text-xl">{userData?.status || 'Нет статуса'}</p>
        <div className="py-10">
          {userData.birth_date ? (
            <p className="text-lg">
              Дата рождения:{' '}
              <span className="text-slate-300 text-lg">
                {parseDate(userData.birth_date).split(' ')[0]}
              </span>
            </p>
          ) : (
            ''
          )}
          {userData.city ? (
            <p className="text-lg">
              Город: <span className="text-slate-300 text-lg">{userData.city}</span>
            </p>
          ) : (
            ''
          )}
          {userData.education ? (
            <p className="text-lg">
              Образование: <span className="text-slate-300 text-lg">{userData.education}</span>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <ImageCrop modalRef={modalRef} setAvatar={setAvatar} userData={userData} />
    </div>
  );
}

export default UserInfo;
