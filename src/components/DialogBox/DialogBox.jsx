import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import DialogElement from './DialogElement/DialogElement';
import { getDialogs } from '../../store/actions/dialogsActions';

function DialogBox({ setDialog = (f) => f, setName = (f) => f }) {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const { dialogs } = useSelector((state) => state.dialogs.user_dialogs);

  const userId = cookie.get('id-user');

  useEffect(() => {
    dispatch(getDialogs(userId));
  }, []);

  return (
    <aside className="w-full border-2 border-slate-100 rounded-md min-h-screen p-1">
      {dialogs &&
        dialogs.map((el, id) => (
          <DialogElement
            key={id}
            name={el.name}
            lastMessage={el.text}
            createdAt={el.created_at}
            id={el.target}
            setDialog={setDialog}
            setName={setName}
          />
        ))}
    </aside>
  );
}

export default DialogBox;
