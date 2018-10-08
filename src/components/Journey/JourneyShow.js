import React from 'react';
import axios from 'axios';
import JourneyTaskCard from './JourneyTaskCard';

class JourneysShow extends React.Component {
  constructor() {
    super();
    this.state = { journey: null};
  }

  componentDidMount() {
    axios.get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => this.setState({ journey: res.data }));
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');

  }

  render() {
    if(!this.state.journey) return null;
    return (
      <div>
        <header className="hero is-medium">
          <div className="hero-body">
            <figure>
              <img className="cover-image" src={ this.state.journey.image } alt={ this.state.journey.title } height="200" />
            </figure>
            <h1 className="title">{ this.state.journey.title }</h1>

            <p>
              { this.state.journey.info }
            </p>
          </div>
        </header>

        <section className="section">
          {this.state.journey.tasks.map(task =>
            <JourneyTaskCard key={task._id} {...task} />
          )}
        </section>

        { this.state.journey.trophyWin &&
        <section className="section has-text-centered	">
          <figure>
            <img className="cover-image" src={ this.state.journey.trophyWin.image } alt={ this.state.journey.trophyWin.name } height="200" />
          </figure>
          <p> <strong> { this.state.journey.trophyWin.name } </strong> </p>
        </section>
        }

      </div>
    );
  }
}

export default JourneysShow;
