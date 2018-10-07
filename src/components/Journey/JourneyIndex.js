import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import JourneyCard from './JourneyCard';

class JourneyIndex extends React.Component {
  constructor() {
    super();
    this.state = {journeys: []};

  }

  componentDidMount(){
    axios.get('/api/journeys')
      .then(res => this.setState({ journeys: res.data }));
  }

  render() {
    return (
      <div>
        <h1 className="title"> Journey </h1>
        <div className="container">
          {this.state.journeys.map(journey =>
            // <li
            //   className="column is-one-quarter-desktop is-one-third-tablet"
            //   key={journey._id}
            // >
            <Link key={journey._id} to={`/journeys/${journey._id}`}>
              <JourneyCard {...journey} />
            </Link>
            // </li>
          )}
        </div>
      </div>
    );
  }
}

export default JourneyIndex;
