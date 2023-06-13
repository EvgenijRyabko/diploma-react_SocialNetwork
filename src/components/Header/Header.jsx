import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const cookies = ['auth-token', 'id-user'];

  const [, , removeCookie] = useCookies(cookies);

  const onButtonClick = () => {
    for (let i = 0; i < cookies.length; i++) removeCookie(cookies[i], { path: '/' });
    navigate('/');
  };

  return (
    <div className="px-4 bg-[#455a64]">
      <div className="grid bg-[#607d8b] rounded-md">
        <button
          type="button"
          className="text-slate-100 place-self-start border-2 p-2 tracking-wide rounded-md"
          onClick={onButtonClick}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export default Header;
