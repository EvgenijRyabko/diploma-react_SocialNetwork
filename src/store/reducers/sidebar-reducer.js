import Cookies from 'universal-cookie';

const cookies = new Cookies();
const userId = cookies.get('id-user');

const initialState = [
  {
    to: `/profile/${userId}`,
    text: 'Profile',
  },
  {
    to: '/dialogs',
    text: 'Dialogs',
  },
  {
    to: '/users',
    text: 'Users',
  },
  {
    to: '/settings',
    text: 'Settings',
  },
];

const sidebarReducer = (state = initialState, action = null) => state;

export default sidebarReducer;
