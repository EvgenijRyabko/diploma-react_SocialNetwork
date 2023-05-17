const initialState = [
  {
    to: '/profile',
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
