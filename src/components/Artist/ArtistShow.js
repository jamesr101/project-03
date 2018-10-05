import React from 'react';
import axios from 'axios';
import Map from '../Map';
import FilterBar from '../FilterBar';

// import { Link } from 'react-router-dom';
// import Auth from '../../lib/Auth';

class ArtistsShow extends React.Component {
  constructor() {
    super();
    this.state = { artist: null};

    this.mapCenter = { lat: 55, lng: -5 };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');


    axios.get(`/api/artists/${this.props.match.params.id}`)
      .then(res => this.setState({ artist: res.data }))
      .then(() => {
        const born = parseFloat(this.state.artist.dateBorn.toString().split('').slice(0,4).join(''));
        const dead = parseFloat(this.state.artist.dateDeath.toString().split('').slice(0,4).join(''));
        this.setState({born: born, dead: dead});
      });




  }

  handleDelete() {
    const token = localStorage.getItem('token');
    axios
      .delete(`/api/artists/${this.props.match.params.id}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/artists'));
  }

  handleTime(e) {
    const actual = e.target.value;
    this.setState({ actual: actual});
  }

  handleChange() {
    console.log('handleChange');
    // const comment = { ...this.state.comment, [e.target.name]: e.target.value };
    // this.setState({ comment });
    // console.log(this.state);
  }


  componentDidUpdate() {
    console.log('componentDidUpdate');
    // axios.get(`/api/artists/${this.props.match.params.id}`)
    //   .then(res => this.setState({ artist: res.data }));
  }

  render() {
    if(!this.state.artist) return null;
    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="title">{ this.state.artist.name }</h1>
          </div>

          <hr />
          <div className="columns">

            <div className="column is-one-quarter">
              <img src={ this.state.artist.image } alt={ this.state.artist.name } height="200" />
            </div>

            <div className="column is-three-quarters">
              <p>
                { this.state.artist.info }
              </p>
              <br />
              <div className="columns">
                <div className="column is-half">
                  <strong> Born </strong><br />
                  { this.state.artist.dateBorn.toString() }
                </div>
                <div className="column is-half">
                  <strong> Death </strong><br />
                  { this.state.artist.dateDeath.toString() }
                </div>

              </div>
            </div>


          </div>
        </div>

        <div className="section">
          <FilterBar handleChange={this.handleChange} />
        </div>

        <Map center={this.mapCenter} zoom={4} paintings={this.state.artist.paintings} />


        <form action="/action_page.php" method="get">
          From
          <br></br>
          {this.state.actual}
          <input type="range" step="1" min={this.state.born} max={this.state.dead} onChange={this.handleTime} ></input>
          <br></br>
           To
          <br></br>
          <input type="range" step="1" min={this.state.born} max={this.state.dead} onChange={this.handleTime} ></input>
          <input type="submit"></input>
        </form>

        <ul>
          {this.state.artist.paintings.map(painting =>
            <li key={painting._id}>
              {console.log(painting.location.latitude)}
              <p> { painting.title } </p>
              <figure> <img src={ painting.image }/> </figure>
              <p>location:</p>
              <p> latitude -{ painting.location.latitude } </p>
              <p>latitude - {painting.location.longitude}</p>

            </li>
          )}
        </ul>

      </section>

    );
  }
}

export default ArtistsShow;
