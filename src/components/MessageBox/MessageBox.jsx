import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getMessages } from '../../store/actions/dialogsActions';
import Message from './Message/Message';

function MessageBox({ dialogId }) {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const { current_messages: messages } = useSelector((state) => state.dialogs);

  const userId = cookie.get('id-user');

  useEffect(() => {
    if (dialogId) dispatch(getMessages(userId, dialogId));
  }, [dialogId]);

  return (
    <div className="h-full">
      {messages &&
        messages.map((el, id) => (
          <Message
            key={id}
            id={el.source_id}
            name={el.name}
            photo={el.photo}
            text={el.text}
            createdAt={el.created_at}
            fromMe={el.source_id === parseInt(userId)}
          />
        ))}
    </div>
  );
}

export default MessageBox;
