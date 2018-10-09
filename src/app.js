import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';
import './scss/style.scss';

import Navbar from './components/Navbar';
import SecureRoute from './components/SecureRoute';
import FlashMessages from './components/FlashMessages';
import Register from './components/Register';
import ArtistIndex from './components/artists/ArtistIndex';
import ArtistNew from './components/artists/ArtistNew';
import ArtistShow from './components/artists/ArtistShow';
import Login from './components/Login';
import UserShow from './components/users/UserShow';
import UserEdit from './components/users/UserEdit';
import PaintingsShow from './components/paintings/PaintingsShow';
import PaintingsNew from './components/paintings/PaintingsNew';
import JourneysIndex from './components/journeys/JourneyIndex';
import JourneyShow from './components/journeys/JourneyShow';
import Main from './components/Main';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <FlashMessages />
          <Switch>
            <Route path="/register" component={Register} />
            <SecureRoute path="/artists/new" component={ArtistNew} />
            <Route path="/artists/:id" component={ArtistShow} />
            <Route path="/artists" component={ArtistIndex} />
            <SecureRoute path="/journeys/:id" component={JourneyShow} />
            <Route path="/journeys" component={JourneysIndex} />
            <Route path="/login" component={Login} />
            <SecureRoute path="/profile/:id/edit" component={UserEdit} />
            <SecureRoute path="/profile" component={UserShow} />
            <Route path="/paintings/new" component={PaintingsNew} />
            <Route path="/paintings/:id" component={PaintingsShow} />
            <Route path="/" component={Main} />
          </Switch>
          <Switch>

          </Switch>
        </div>
      </BrowserRouter>


    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
