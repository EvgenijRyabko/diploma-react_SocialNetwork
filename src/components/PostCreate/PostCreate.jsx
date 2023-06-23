import React from 'react';

function PostCreate({ postCreate, setPostCreate = (f) => f, onPostCreate = (f) => f }) {
  return (
    <section className="grid grid-rows-[2fr_5fr_2fr] gap-4 p-4 bg-[#6d91a3] m-4 rounded">
      <input
        value={postCreate.header}
        onChange={(e) => setPostCreate({ ...postCreate, header: e.target.value })}
        className="w-4/6 place-self-center bg-transparent border-2 rounded-md outline-none px-2"
        maxLength={50}
      />
      <textarea
        value={postCreate.text}
        maxLength={200}
        onChange={(e) => setPostCreate({ ...postCreate, text: e.target.value })}
        className="w-4/6 min-h-[200px] place-self-center bg-transparent border-2 rounded-md outline-none px-2"
      />
      <button
        type="button"
        className="w-4/6 place-self-center bg-transparent hover:text-amber-400 hover:border-amber-400 duration-300 font-semibold py-2 px-4 border rounded"
        onClick={() => onPostCreate()}
      >
        Опубликовать
      </button>
    </section>
  );
}

export default PostCreate;
