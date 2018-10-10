import React from 'react';
import axios from 'axios';
import JourneyTaskCard from './JourneyTaskCard';

class JourneysShow extends React.Component {
  constructor() {
    super();
    this.state = { journey: null, isComleted: false};
    this.sumFindPaintinTask;
    this.sumDoneFindPaintinTask = 0;

    this.taskDone = this.taskDone.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    axios.get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => this.setState({ journey: res.data }))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }


  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.sumFindPaintinTask = this.state.journey.tasks.filter(elt => elt.type === 'FindPainting').length;
    console.dir(this.sumFindPaintinTask);
  }

  taskDone() {
    console.log('taskDone---->');
    ++this.sumDoneFindPaintinTask;
    console.log(this.sumDoneFindPaintinTask);
    if (this.sumFindPaintinTask === this.sumDoneFindPaintinTask)
      this.setState({ isComleted: true });

  }

  render() {
    console.log('render Journeyshow');
    if(!this.state.journey) return null;
    return (
      <main className="journey-show">
        <header className="hero is-medium">

          <figure>
            <img className="cover-image" src={ this.state.journey.image } alt={ this.state.journey.title } height="200" />
          </figure>
          <h1 className="title">{ this.state.journey.title }</h1>

          <p>
            { this.state.journey.info }
          </p>

        </header>
        <section className="hero journey-tasks">

          <div className="container">
            <div className="vl"></div>
            <section className="section">
              {this.state.journey.tasks.map(task =>
                <JourneyTaskCard key={task._id} taskDone={this.taskDone} {...task} />
              )}
            </section>

            { this.state.journey.trophyWin && this.state.isComleted === false &&
            <section className="section has-text-centered">
              <figure className="image is-128x128 trophy">
                <img className="cover-image" src={'/assets/images/award.svg'} alt={ this.state.journey.trophyWin.name } />
                {/* <img className="cover-image" src={ this.state.journey.trophyWin.image } alt={ this.state.journey.trophyWin.name } height="200" /> */}
              </figure>
              <p> <strong> { this.state.journey.trophyWin.name } </strong> </p>
            </section>
            }

            { this.state.journey.trophyWin && this.state.isComleted === true &&
            <section className="section has-text-centered trophy">
              <figure className="image is-128x128 trophy">
                <img className="cover-image" src={'/assets/images/award-animation.svg'} alt={ this.state.journey.trophyWin.name } />
              </figure>
              <p> <strong> pa paw!!! </strong> </p>
            </section>
            }
          </div>
        </section>
      </main>
    );
  }
}

export default JourneysShow;
