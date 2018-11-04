import React from 'react';
import axios from 'axios';
import Map from '../Map';
import FilterBar from '../FilterBar';
import PaintingCard from '../paintings/PaintingCard';
import { Link } from 'react-router-dom';

class ArtistsShow extends React.Component {

  constructor() {
    super();
    this.state = { artist: null};

    this.mapCenter = { latitude: 55, longitude: -5 }; //Default value (Center of England)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/artists/${this.props.match.params.id}`)
      .then(res => this.setState({ artist: res.data, search: '' }))
      .then(() => {
        const born = parseFloat(this.state.artist.dateBorn);
        const dead = parseFloat(this.state.artist.dateDeath);
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
    const actualDate = parseFloat(e.target.value);
    this.setState({ actualDate });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  filterArtistsPaintings() {
    const re = new RegExp(this.state.search, 'i');
    return this.state.artist.paintings.filter(painting => {
      const date = parseFloat(painting.date);
      return (date > this.state.actualDate - 10 && date < this.state.actualDate + 10) && re.test(painting.title);
    });
  }

  defineClass() {
    let entrance;
    if(!this.state.actualDate && !this.state.search){
      entrance = this.state.artist.paintings.length;
    } else {
      entrance = this.filterArtistsPaintings().length;
    }
    if(entrance === 1) return ('column');
    else if (entrance % 2 === 0 && entrance % 3 !== 0) return ('column is-half');
    else return('column is-one-third');
  }
<<<<<<< HEAD

  isPaintingToShow(){
    if ((!this.state.actualDate && !this.state.search)
      ||(this.filterArtistsPaintings().length > 0))
=======
  noPaintingsToDisplay(){
    if (!this.state.actualDate && !this.state.search){
      return true;
    } else if(this.filterArtistsPaintings().length > 0){
>>>>>>> 1cc67376a24ef0b71c2265bbbed87988f4f572db
      return true;
    return false;
  }

  render() {
    if(!this.state.artist) return null;
    return (
      <main className="section">
        <div className="container">
          <section className="section">
            <div className="sticky">

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
            </div>
          </section>

          {this.state.artist.paintings.length > 0 ?
            <section>
              <div>

                <Map center={this.mapCenter} zoom={4} paintings={this.state.artist.paintings} />

                <div className="columns is-multiline">
                  <div className="margin-top-15  column is-one-third">
                    <FilterBar handleChange={this.handleChange} />
                  </div>
                  <div className="margin-top-15  column is-one-third">
                    <form  className="artist-date-form" action="/action_page.php" method="get">
                      {!this.state.actualDate && <p className="artist-date-text">Select time range</p>}
                      {this.state.actualDate && <p className="artist-date-text">{this.state.actualDate - 10} - {this.state.actualDate + 10} </p>}
                      <input className="artist-date-input" type="range" step="1" min={this.state.born} max={this.state.dead} onChange={this.handleTime}   ></input>
                    </form>
                  </div>

                  <Link className="margin-top-15 centralizer column is-one-third" to={'/paintings/new'}>
                    <button className="button is-primary"> Add a new painting</button>
                  </Link>


                </div>
              </div>
              <div>
                <ul className="columns is-multiline">
                  {!this.state.actualDate && !this.state.search && this.state.artist.paintings.map(painting =>
                    <li className={this.defineClass()} key={painting._id}>
                      <Link to={`/paintings/${painting._id}`}>
                        <PaintingCard {...painting} />
                      </Link>
                    </li>
                  )
                  }
<<<<<<< HEAD
                  {this.isPaintingToShow() ?
                    this.filterArtistsPaintings().map(painting =>
                      <li className={this.defineClass()} key={painting._id}>
                        <Link to={`/paintings/${painting._id}`}>
                          <PaintingCard {...painting} />
                        </Link>
                      </li>
                    )
=======
                  {this.noPaintingsToDisplay() ? this.filterArtistsPaintings().map(painting =>

                    <li className={this.defineClass()} key={painting._id}>
                      <Link to={`/paintings/${painting._id}`}>
                        <PaintingCard {...painting} />
                      </Link>
                    </li>
                  )
>>>>>>> 1cc67376a24ef0b71c2265bbbed87988f4f572db
                    :
                    <div className="recipient margin-top-15">
                      <p>
                        There are no paintings related to {this.state.artist.name}
                      </p>
                      <Link className="margin-left-20" to={{
                        pathname: '/paintings/new',
                        state: { artist: this.props.match.params.id}
                      }}>
                         Add a {this.state.artist.name} painting
                      </Link>
                    </div>

                  }
                </ul>
              </div>
            </section>
            :
            <div className="recipient margin-top-15">
              <p>
                There are no paintings related to {this.state.artist.name}
              </p>
              <Link className="margin-left-20" to={'/paintings/new'}>
                 Add a {this.state.artist.name} painting
              </Link>
            </div>
          }

        </div>
      </main>
    );
  }
}

export default ArtistsShow;
