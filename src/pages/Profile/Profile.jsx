import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { getPosts, deletePost, createPost } from '../../store/actions/postsActions';
import { getUserById } from '../../store/actions/usersActions';
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
  const [avatar, setAvatar] = useState({});
  const { posts, isLoading: postsLoading, error: postsError } = useSelector((state) => state.posts);
  const {
    currentUser,
    isLoading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);
  // const [posts, setPosts] = useState([]);

  const userId = parseInt(location.pathname.split('/').reverse()[0]);

  const isOwner = parseInt(cookie.get('id-user')) === userId;

  useEffect(() => {
    (async () => {
      await dispatch(getPosts(userId));
      await dispatch(getUserById(userId));
    })();
  }, [userId]);

  useEffect(() => {
    setAvatar(
      currentUser?.profile_img ? import.meta.env.VITE_APP_STORAGE + currentUser.profile_img : null,
    );
  }, [currentUser]);

  const onPostCreate = async () => {
    await dispatch(createPost(userId, postCreate.header, postCreate.text));

    setPostCreate({ header: '', text: '' });

    await dispatch(getPosts(userId));
  };

  const onPostDelete = async (id) => {
    await dispatch(deletePost(id));
    await dispatch(getPosts(userId));
  };

  return (
    <section className="flex flex-wrap">
      <UserInfo
        userData={currentUser}
        userImage={avatar}
        isOwner={isOwner}
        isLoading={usersLoading}
        setAvatar={setAvatar}
      />
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

      <HelmetProvider>
        <Helmet title={currentUser.name} />
      </HelmetProvider>
    </section>
  );
}

export default Profile;
