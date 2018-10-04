import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../lib/Auth';

const Navbar = (props) => {

  const logout = () => {
    Auth.logout();
    props.history.push('/');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            ArtMapper
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to="/artists">Artists</Link>
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/artists/new">Add a artist</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={logout}>Logout</a>}
          </div>
        </div>
      </div>
    </nav>
  );
};
// use withRouter here to add history to 'props'
// so we can redirect programmatically
export default withRouter(Navbar);
