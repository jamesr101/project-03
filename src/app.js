import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';
import './scss/style.scss';

import Navbar from './components/Navbar';
import SecureRoute from './components/SecureRoute';
import FlashMessages from './components/FlashMessages';
import Register from './components/Register';
import ArtistIndex from './components/Artist/ArtistIndex';
import ArtistNew from './components/Artist/ArtistNew';
import ArtistShow from './components/Artist/ArtistShow';
import Login from './components/Login';
import UserShow from './components/users/UserShow';
import PaintingsShow from './components/PaintingsShow';
import PaintingsNew from './components/PaintingsNew';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <FlashMessages />


          <main className="section">
            <div className="container">
              <Switch>
                <Route path="/register" component={Register} />
                <SecureRoute path="/artists/new" component={ArtistNew} />
                <Route path="/artists/:id" component={ArtistShow} />
                <Route path="/artists" component={ArtistIndex} />
                <Route path="/login" component={Login} />
                <Route path="/user/:id" component={UserShow} />
                <Route path="/paintings/new" component={PaintingsNew} />
                <Route path="/paintings/:id" component={PaintingsShow} />
              </Switch>
            </div>
          </main>
        </div>
      </BrowserRouter>

    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
