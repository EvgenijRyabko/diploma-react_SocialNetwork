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
import defaultAvatar from '../../assets/defaultAvatar.svg';
import Posts from '../../components/Posts/Posts';
import classes from './Profile.module.css';

function Profile() {
  const cookie = new Cookies();
  const location = useLocation();
  const dispatch = useDispatch();
  const [postCreate, setPostCreate] = useState({ header: '', text: '' });
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState({});
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
  }, [userId]);

  useEffect(() => {
    setAvatar(
      userData?.profile_img ? import.meta.env.VITE_APP_STORAGE + userData.profile_img : null,
    );
  }, [userData]);

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
    <div className="grid grid-cols-[2fr_7fr] gap-6 p-4 min-h-screen min-w-[1200px] bg-[#455a64] text-slate-100">
      <NavBar />
      <section className="flex flex-wrap">
        <UserInfo userData={userData} userImage={avatar} isOwner={isOwner} setAvatar={setAvatar} />
        <div className="rounded-md bg-[#607d8b] min-w-full m-[16px_0_0_0]">
          <header className="my-6 mx-16 text-4xl">Публикации</header>
          {isOwner && (
            <PostCreate
              postCreate={postCreate}
              setPostCreate={setPostCreate}
              onPostCreate={onPostCreate}
            />
          )}
          <Posts
            posts={posts}
            avatar={avatar}
            defaultAvatar={defaultAvatar}
            onPostDelete={onPostDelete}
          />
        </div>
      </section>

      <HelmetProvider>
        <Helmet title={userData.name} />
      </HelmetProvider>
    </div>
  );
}

export default Profile;
