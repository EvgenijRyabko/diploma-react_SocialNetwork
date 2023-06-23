import React from 'react';
import classes from './Posts.module.css';

function Posts({ posts, isOwner, avatar, username, defaultAvatar, onPostDelete = (f) => f }) {
  return (
    <>
      {posts.map((el, id) => (
        <section key={id} className={classes.postBox}>
          <div className={classes.imageBox}>
            <img src={avatar || defaultAvatar} alt="userLogo" className={classes.image} />
          </div>
          <div className={classes.textBox}>
            <h3 className={classes.username}>{username}</h3>
            <div className={classes.postText}>
              <p className={classes.header}>{el.header || ''}</p>
              <p className={classes.text}>{el.text}</p>
            </div>
          </div>
          {isOwner && (
            <button
              className={classes.deleteBtn}
              key={id}
              type="button"
              onClick={() => onPostDelete(el.id)}
            >
              Удалить
            </button>
          )}
        </section>
      ))}
    </>
  );
}

export default Posts;
