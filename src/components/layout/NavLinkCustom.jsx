// CustomNavLink.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getClasses } from '../../utils'; // se hai creato un file utils.js
import FiltersWrapper from './filtersWrapper';

function CustomNavLink({ to, children, extraClass = '', onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const type = extraClass === 'button' ? 'button-nav' : 'link-nav';
  const className = getClasses({ isActive, type, extraClass });

  return (
    <FiltersWrapper>
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    </FiltersWrapper>
  );
}

export default CustomNavLink;
