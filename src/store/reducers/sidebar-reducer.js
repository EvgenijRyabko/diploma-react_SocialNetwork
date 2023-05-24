import Cookies from 'universal-cookie';

const cookies = new Cookies();
const userId = cookies.get('id-user');

const initialState = [
  {
    to: `/profile/${userId}`,
    text: 'PROFILE',
  },
  {
    to: '/dialogs',
    text: 'DIALOGS',
  },
  {
    to: '/users',
    text: 'USERS',
  },
  {
    to: '/settings',
    text: 'SETTINGS',
  },
];

const sidebarReducer = (state = initialState, action = null) => state;

export default sidebarReducer;
