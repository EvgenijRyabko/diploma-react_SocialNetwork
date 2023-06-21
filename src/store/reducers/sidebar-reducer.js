const initialState = {
  getNavigation: (userId) => [
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
  ],
};

export const sidebarReducer = (state = initialState, _) => state;
