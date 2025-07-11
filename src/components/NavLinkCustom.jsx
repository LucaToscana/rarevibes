// CustomNavLink.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getClasses } from '../utils'; // se hai creato un file utils.js

function CustomNavLink({ to, children, extraClass = '', onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const className = getClasses({ isActive, type: 'link', extraClass });

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default CustomNavLink;
