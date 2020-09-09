import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <header className="logo__header">
      <Link to="/">
        <div className="logo">왓더제주</div>
      </Link>
    </header>
  );
};

export default Logo;
