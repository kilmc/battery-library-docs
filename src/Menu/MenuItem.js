import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ title, route }) => {
  return (
    <li>
      <NavLink
        className='block soft-black text-decoration-none py1'
        to={`${route.toLowerCase()}`}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default MenuItem;