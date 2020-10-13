import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

const Logo = ({ title }) => {
  return (
    <header className="logo__header">
      <Link to="/">
        <div className="logo">{title}</div>
      </Link>
    </header>
  );
};

export default Logo;
