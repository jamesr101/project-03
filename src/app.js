import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom';

import 'bulma';

import Register from './components/Register';
import login from './components/login';

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
                <Route path="/login" component={login} />
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
