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
      <main className="section">
        <div className="container">
          <h2 className="title"> Journey </h2>
          <div className="container">
            {this.state.journeys.map(journey =>
              <Link key={journey._id} to={`/journeys/${journey._id}`}>
                <JourneyCard {...journey} />
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default JourneyIndex;
