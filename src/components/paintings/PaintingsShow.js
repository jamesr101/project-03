import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Map from '../Map';

import Auth from '../../lib/Auth';

class PaintingsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artist: null};

    this.mapCenter = { latitude: 55, longitude: -5 };

    this.state = {
      painting: null,
      artist: null,
      limit: 0,
      wikil: null
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  getPainting() {
    axios.get(`/api/paintings/${this.props.match.params.id}`)
      .then(res => this.setState({ painting: res.data }));
  }

  componentDidMount() {
    this.getPainting();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getPainting();
      window.scrollTo(0,0);
    }
  }

  handleDelete(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .delete(`/api/paintings/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => this.props.history.push('/paintings'));
  }

  showMore(e){
    e.preventDefault();
    let numberOfPaintingsDisplayed;
    if(e.target.id === 'more'){
      numberOfPaintingsDisplayed = this.state.limit + 3;
    } else if(this.state.limit < 3){
      numberOfPaintingsDisplayed = 0;
    } else {
      numberOfPaintingsDisplayed = this.state.limit - 3;
    }
    axios.get(`/api/artists/${this.state.painting.artist._id}`)
      .then(res => this.setState({ artist: res.data }))
      .then(() => {
        if(this.state.artist.paintings.length < numberOfPaintingsDisplayed){
          this.setState({ limit: this.state.artist.paintings.length});
        } else {
          this.setState({ limit: numberOfPaintingsDisplayed});
        }
      })  ;

  }



  render() {
    if(!this.state.painting) return null;
    return (

      <main className="section">
        <div className="container">
          <div className="level">
            <h1 className="title is-3">{ this.state.painting.title }</h1>

            <div className="page-banner col-md-12">
              {Auth.isAuthenticated() && <Link to={`/paintings/${this.state.painting._id}/edit`} className="button">
                Edit
              </Link>}
              {Auth.isAuthenticated() && <button onClick={this.handleDelete} className="button is-danger">
                Delete
              </button>}
            </div>

          </div>


          <img src={ this.state.painting.image } alt={ this.state.painting.title } height="200" />

          <div className="section">
            <h1 className="title is-4">{ this.state.painting.title}, {parseFloat(this.state.painting.date)}</h1>

            <Link to={`/artists/${this.state.painting.artist.id}`} className="subtitle is-4">{ this.state.painting.artist.name}</Link>

            {this.state.painting.info && <p>{this.state.painting.info}</p>}

            <br/>
            {this.state.painting.wikiLink && <a href={this.state.painting.wikiLink}>Wikipedia</a>}

          </div>

          <Map
            paintings={[this.state.painting]}
            center={this.state.painting.location || this.mapCenter}
            zoom={4}
          />


          <div className="section columns is-multiline">
            {this.state.artist && this.state.artist.paintings.slice(0,this.state.limit).map(painting =>
              <li className="column is-one-third" key={painting._id} >

                <Link to={`/paintings/${painting._id}`}>
                  {/* <img src={ painting.image } alt={ painting.title } height="200" /> */}

                  <div className="card ">
                    <header className="card-header">
                      <h2 className="card-header-title">{painting.title}</h2>
                    </header>
                    <div className="card-image ">
                      <figure className="image">
                        <img src={painting.image} alt={painting.title} height="200"/>
                      </figure>
                    </div>

                  </div>
                </Link>


              </li>
            )}
          </div>

          <div className="level">

            <button className="button" id="more" onClick={this.showMore}>
               More paintings by
              {' ' + this.state.painting.artist.name || ' this artist'}
            </button>


            {this.state.limit > 0 &&
              <button className="button" id="less" onClick={this.showMore}>
                Show less
              </button>
            }
          </div>

        </div>
      </main>

    );
  }
}

export default PaintingsShow;
