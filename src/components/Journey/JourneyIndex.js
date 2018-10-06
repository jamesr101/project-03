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
        <h1> Journey </h1>
        <ul className="columns is-multiline">
          {this.state.journeys.map(journey =>
            <li
              className="column is-one-quarter-desktop is-one-third-tablet"
              key={journey._id}
            >
              <Link to={`/journeys/${journey._id}`}>
                <JourneyCard {...journey} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default JourneyIndex;
