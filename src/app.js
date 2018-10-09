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
import UserEdit from './components/users/UserEdit';
import PaintingsShow from './components/Painting/PaintingsShow';
import PaintingsNew from './components/Painting/PaintingsNew';
import JourneysIndex from './components/Journey/JourneyIndex';
import JourneyShow from './components/Journey/JourneyShow';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <FlashMessages />
          <main className="section">
            <div className="container">
              <Switch>
                <Route path="/register" component={Register} />
                <SecureRoute path="/artists/new" component={ArtistNew} />
                <Route path="/artists/:id" component={ArtistShow} />
                <Route path="/artists" component={ArtistIndex} />
                <SecureRoute path="/journeys/:id" component={JourneyShow} />
                <Route path="/journeys" component={JourneysIndex} />
                <Route path="/login" component={Login} />
                <Route path="/profile/:id/edit" component={UserEdit} />
                <Route path="/profile" component={UserShow} />
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
