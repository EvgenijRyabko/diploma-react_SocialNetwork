import React from 'react';

function PostCreate({ postCreate, setPostCreate = (f) => f, onPostCreate = (f) => f }) {
  return (
    <section className="grid grid-rows-[2fr_5fr_2fr] gap-4 p-4 bg-[#6d91a3] m-4 rounded">
      <input
        value={postCreate.header}
        onChange={(e) => setPostCreate({ ...postCreate, header: e.target.value })}
        className="w-4/6 place-self-center bg-transparent border-2 rounded-md outline-none px-2"
      />
      <textarea
        value={postCreate.text}
        onChange={(e) => setPostCreate({ ...postCreate, text: e.target.value })}
        className="w-4/6 min-h-[200px] place-self-center bg-transparent border-2 rounded-md outline-none px-2"
      />
      <button
        type="button"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => onPostCreate()}
      >
        Опубликовать
      </button>
    </section>
  );
}

export default PostCreate;
