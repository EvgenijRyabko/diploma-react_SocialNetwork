import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import DialogBox from '../../components/DialogBox/DialogBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { getMessages, sendMessage } from '../../store/actions/dialogsActions';

function Dialogs() {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const [dialogId, setDialogId] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();

  const userId = cookie.get('id-user');

  const onSendMessage = async () => {
    if (message) {
      await dispatch(sendMessage(userId, dialogId, message));
      await dispatch(getMessages(userId, dialogId));
    } else Swal.fire({ icon: 'error', title: 'Введите сообщение!' });
  };

  return (
    <div className="rounded-md bg-[#607d8b] min-w-full p-2">
      <div className="grid grid-cols-[4fr_6fr] gap-2">
        <DialogBox setDialog={setDialogId} setName={setName} />
        <section className="grid grid-rows-[50px_4fr_110px] gap-2 w-full min-h-full border-2 border-slate-100 rounded-md">
          <header className="min-w-full min-h-[50px] mb-4 text-2xl text-center text-slate-100 border-2 border-slate-100">
            {name || ''}
          </header>
          <MessageBox dialogId={dialogId} />
          {dialogId && (
            <div className="grid grid-cols-[6fr_2fr] p-1">
              <textarea
                value={message}
                className="border-2 border-slate-100 bg-transparent min-h-[100px] p-1"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="bg-slate-100 text-[#607d8b]" type="button" onClick={onSendMessage}>
                Отправить
              </button>
            </div>
          )}
        </section>
      </div>
      <HelmetProvider>
        <Helmet title="Диалоги" />
      </HelmetProvider>
    </div>
  );
}

export default Dialogs;
