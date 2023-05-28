import React from 'react';

function Posts({ posts, avatar, defaultAvatar, onPostDelete = (f) => f }) {
  return (
    <>
      {posts.map((el, id) => (
        <section key={id} className="grid grid-cols-[2fr_8fr_2fr] bg-[#6d91a3] m-4 rounded-md">
          <div className="border-2 border-slate-200 rounded-xl m-2 min-w-[200px] min-h-[200px]">
            <img
              src={avatar || defaultAvatar}
              alt="userLogo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-rows-[1fr_3fr] p-4 min-w-[500px]">
            <h3>{el.header}</h3>
            <p>{el.text}</p>
          </div>
          <button
            className="text-rose-500 font-semibold border-2 border-rose-500 min-w-[150px] w-4/5 h-2/5 rounded-md place-self-center hover:bg-rose-500 hover:text-slate-200 transition duration-300"
            key={id}
            type="button"
            onClick={() => onPostDelete(el.id)}
          >
            Удалить
          </button>
        </section>
      ))}
    </>
  );
}

export default Posts;
