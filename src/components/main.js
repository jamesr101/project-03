import React from 'react';
import { withRouter } from 'react-router-dom';


class Main extends React.Component {
  constructor() {
    super();

  }


  render() {
    return (
      <main>
        <p className="logo title">ArtMapper --- main</p>

      </main>
    );
  }
}

export default withRouter(Main);
