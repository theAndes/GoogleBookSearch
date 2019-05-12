import React from 'react';

function Nav() {
  return (
    <nav className="p-3 mb-2 bg-info ">
      <a className="navbar-brand text-white" href="/">
        Google Reading List
      </a>
      <a className="navbar-brand float-right text-white" href="/saved">
        Saved Reading List
      </a>

    </nav>
  );
}

export default Nav;
