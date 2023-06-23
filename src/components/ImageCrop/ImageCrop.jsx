import React, { useRef, useState } from 'react';
import './ImageCrop.css';
import { ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch } from 'react-redux';
import { postProfileImage } from '../../store/actions/usersActions';

function ImageCrop({ modalRef, userData, setAvatar = (f) => f }) {
  const dispatch = useDispatch();
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 300,
    height: 300,
  });
  const imageRef = useRef();
  const inputRef = useRef();

  const changeProfilePhoto = async (image) => {
    const formData = new FormData();

    formData.append('file', image);

    const res = await dispatch(postProfileImage({ userId: userData.id, formData }));

    setAvatar(import.meta.env.VITE_APP_STORAGE + res);
  };

  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  const cropImageNow = async () => {
    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    // eslint-disable-next-line no-promise-executor-return
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
    changeProfilePhoto(blob);
    modalRef.current.classList.remove('active');
    setSrc(null);
    inputRef.current.value = null;
  };

  return (
    <div id="openModal" ref={modalRef} className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <input
              className="relative m-2 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              ref={inputRef}
              type="file"
              accept="image/*"
              id="formFile"
              onChange={(e) => {
                selectImage(e.target.files[0]);
              }}
            />
            <button
              type="button"
              className="close"
              onClick={() => modalRef.current.classList.remove('active')}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            {src && (
              <div className="grid grid-rows-[6fr_2fr]">
                <ReactCrop src={src} crop={crop} onChange={setCrop} circularCrop locked>
                  <img ref={imageRef} src={src} alt="crop" />
                </ReactCrop>
                <button
                  type="button"
                  className="place-self-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={cropImageNow}
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Загрузить</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCrop;
