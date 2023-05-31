import Cookies from 'universal-cookie';

const cookies = new Cookies();
const userId = cookies.get('id-user');

const initialState = [
  {
    to: `/profile/${userId}`,
    text: 'ГЛАВНАЯ',
  },
  {
    to: '/dialogs',
    text: 'ДИАЛОГИ',
  },
  {
    to: '/friends',
    text: 'ДРУЗЬЯ',
  },
  {
    to: '/users',
    text: 'ПОЛЬЗОВАТЕЛИ',
  },
  {
    to: '/settings',
    text: 'НАСТРОЙКИ',
  },
];

const sidebarReducer = (state = initialState, _) => state;

export default sidebarReducer;
