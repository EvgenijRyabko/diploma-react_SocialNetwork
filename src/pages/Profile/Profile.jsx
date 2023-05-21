import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { getPosts, deletePost, createPost } from '../../store/actions/postsAction';
import { getUserById } from '../../store/actions/usersAction';
import NavBar from '../../components/NavBar/NavBar';
import PostCreate from '../../components/PostCreate/PostCreate';
import UserInfo from '../../components/UserInfo/UserInfo';
import classes from './Profile.module.css';

function Profile() {
  const cookie = new Cookies();
  const location = useLocation();
  const dispatch = useDispatch();
  const [postCreate, setPostCreate] = useState({ header: '', text: '' });
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  const userId = parseInt(location.pathname.split('/').reverse()[0]);

  const isOwner = parseInt(cookie.get('id-user')) === userId;

  useEffect(() => {
    (async () => {
      const { payload: postsPayload } = await dispatch(getPosts({ id: userId }));
      const { payload: userPayload } = await dispatch(getUserById(userId));

      setUserData(...userPayload);
      setPosts(postsPayload);
    })();
  }, []);

  const onPostCreate = async () => {
    await dispatch(createPost({ id: userId, header: postCreate.header, text: postCreate.text }));

    setPostCreate({ header: '', text: '' });

    const { payload: postPayload } = await dispatch(getPosts({ id: userId }));

    setPosts(postPayload);
  };

  const onPostDelete = async (id) => {
    await dispatch(deletePost({ id }));
    const { payload: postPayload } = await dispatch(getPosts({ id: userId }));
    setPosts(postPayload);
  };

  return (
    <div className="grid grid-cols-[2fr_10fr] gap-6 p-4 min-h-screen min-w-full bg-[#455a64] text-slate-100">
      <NavBar />
      <section className="flex flex-wrap">
        <UserInfo userData={userData} isOwner={isOwner} />
        <div className="rounded-md bg-[#607d8b] w-full m-[16px_0_0_0]">
          <header className="m-4 text-[calc(36px+1vw)]">Posts</header>
          {isOwner && (
            <PostCreate
              postCreate={postCreate}
              setPostCreate={setPostCreate}
              onPostCreate={onPostCreate}
            />
          )}
          {posts.map((el, id) => (
            <section key={id} className="grid grid-cols-[8fr_2fr] bg-[#6d91a3] m-4 rounded-md">
              <div className="grid grid-rows-[3fr_6fr] p-4">
                <h3>{el.header}</h3>
                <p>{el.text}</p>
              </div>
              <button key={id} type="button" onClick={() => onPostDelete(el.id)}>
                Delete
              </button>
            </section>
          ))}
        </div>
      </section>

      <HelmetProvider>
        <Helmet title={userData.name} />
      </HelmetProvider>
    </div>
  );
}

export default Profile;
