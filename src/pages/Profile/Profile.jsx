import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, deletePost, createPost } from '../../store/actions/postsAction';
import NavBar from '../../components/NavBar/NavBar';
import classes from './Profile.module.css';

function Profile() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [header, setHeader] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(getPosts({ id: 2 }));
  }, [posts]);

  return (
    <div className="grid grid-cols-[2fr_10fr] gap-6 p-4 min-h-screen min-w-full bg-[#455a64] text-slate-100">
      <NavBar />
      <section className="flex flex-wrap">
        <div className="grid grid-cols-[2fr_7fr] rounded-md bg-[#607d8b] w-full min-h-[300px]">
          <div>
            <img alt="userLogo" />
          </div>
          <div>
            <header>Имя</header>
            <p>Статус</p>
            <p>Информация</p>
          </div>
        </div>
        <div className="rounded-md bg-[#607d8b] w-full m-[16px_0_0_0]">
          <header className="m-4 text-[calc(36px+1vw)]">Posts</header>
          <section className="grid grid-rows-[2fr_5fr_2fr] gap-4 p-4 bg-[#6d91a3] m-4 rounded">
            <input
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-4/6 place-self-center bg-transparent border-2 rounded-md outline-none px-2"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-4/6 min-h-[200px] place-self-center bg-transparent border-2 rounded-md outline-none px-2"
            />
            <button
              type="button"
              className="w-2/6 border-2 border-[#455a64] place-self-center rounded-md"
              onClick={() => {
                setHeader('');
                setText('');
                dispatch(createPost({ id: 2, header, text }));
              }}
            >
              Post
            </button>
          </section>
          {posts.map((el, id) => (
            <section key={id} className="grid grid-cols-[8fr_2fr] bg-[#6d91a3] m-4 rounded-md">
              <div className="grid grid-rows-[3fr_6fr] p-4">
                <h3>{el.header}</h3>
                <p>{el.text}</p>
              </div>
              <button type="button" onClick={() => dispatch(deletePost({ id: el.id }))}>
                Delete
              </button>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Profile;
