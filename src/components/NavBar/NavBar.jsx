import React from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

function NavBar() {
  const cookie = new Cookies();
  const { getNavigation } = useSelector((state) => state.navigation);

  const userId = cookie.get('id-user');

  return (
    <aside className={classes.container}>
      <ul className={classes.list}>
        {getNavigation(userId).map((el, id) => (
          <li key={id} className={classes.item}>
            <NavLink className={classes.navText} to={el.to}>
              {el.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default NavBar;
