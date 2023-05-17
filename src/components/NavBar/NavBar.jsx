import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

function NavBar() {
  const navigation = useSelector((state) => state.sidebar);

  return (
    <aside className={classes.container}>
      <ul className={classes.list}>
        {navigation.map((el, id) => (
          <li key={id} className={classes.item}>
            <NavLink to={el.to}>{el.text}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default NavBar;
