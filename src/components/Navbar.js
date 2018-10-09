import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navbarActive: false };
    this.logout = this.logout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname)
      this.setState({ navbarActive: false});
  }

  logout = () => {
    Auth.logout();
    this.props.history.push('/');
  };

  toggleNavbar() {
    this.setState({ navbarActive: !this.state.navbarActive });
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand logo">
            <Link className="navbar-item" to="/">
            ArtMapper
            </Link>

            <a role="button" className={`navbar-burger ${this.state.navbarActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={this.toggleNavbar}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>


          <div className= {`navbar-menu ${this.state.navbarActive ? 'is-active' : ''}`}>
            <div className="navbar-end">

              <Link className="navbar-item" to="/artists">Artists</Link>
              <Link className="navbar-item" to="/journeys">Journeys</Link>
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/artists/new">Add Artist</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/paintings/new">Add Painting</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/profile">Profile</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}


// use withRouter here to add history to 'props'
// so we can redirect programmatically
export default withRouter(Navbar);
