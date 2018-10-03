import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom';

import 'bulma';

import Register from './components/Register';
import ArtistIndex from './components/Artist/ArtistIndex';
import ArtistNew from './components/Artist/ArtistNew';
import ArtistShow from './components/Artist/ArtistShow';
import Login from './components/Login';
import UserShow from './components/users/UserShow';
import PaintingsShow from './components/PaintingsShow';

class App extends React.Component {
  render() {
    return (
      <Browser>

        <div>
          <h1>Art Mapper</h1>
          <main className="section">
            <div className="container">
              <Switch>
                <Route path="/register" component={Register} />

                <Route path="/artists/new" component={ArtistNew} />
                <Route path="/artists/:id" component={ArtistShow} />

                <Route path="/artists" component={ArtistIndex} />

                <Route path="/login" component={Login} />
                <Route path="/user/:id" component={UserShow} />
                <Route path="/paintings/:id" component={PaintingsShow} />

              </Switch>
            </div>
          </main>
        </div>
      </Browser>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
