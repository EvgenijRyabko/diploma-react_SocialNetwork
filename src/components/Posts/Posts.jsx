import React from 'react';

function Posts({ posts, isOwner, avatar, username, defaultAvatar, onPostDelete = (f) => f }) {
  return (
    <>
      {posts.map((el, id) => (
        <section key={id} className="grid grid-cols-[2fr_7fr_3fr] bg-[#6d91a3] m-4 rounded-md">
          <div className="m-2 min-w-[200px] min-h-[200px]">
            <img
              src={avatar || defaultAvatar}
              alt="userLogo"
              className="min-w-[200px] min-h-[200px] object-cover rounded-[50%] border-2 border-slate-200"
            />
          </div>
          <div className="flex flex-wrap p-4 min-w-[500px]">
            <h3 className="text-2xl text-slate-300 my-2 w-full">{username}</h3>
            <div className="flex flex-wrap">
              <p className="w-full text-xl mb-2">{el.header || ''}</p>
              <p className="w-full text-lg break-all">{el.text}</p>
            </div>
          </div>
          {isOwner && (
            <button
              className="text-rose-500 font-semibold border-2 border-rose-500 min-w-[150px] w-4/5 h-[100px] rounded-md place-self-center hover:bg-rose-500 hover:text-slate-200 transition duration-300"
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
