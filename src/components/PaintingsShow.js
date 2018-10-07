import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../lib/Auth';

class PaintingsShow extends React.Component {
  constructor() {
    super();
    this.state = {
      painting: null,
      artist: null,
      limit: 0,
      wikil: null
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/paintings/${this.props.match.params.id}`)
      .then(res => this.setState({ painting: res.data }));
    console.log();
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
      numberOfPaintingsDisplayed = this.state.limit + 4;
    } else if(this.state.limit < 4){
      numberOfPaintingsDisplayed = 0;
    } else {
      numberOfPaintingsDisplayed = this.state.limit - 4;
    }
    axios.get(`/api/artists/${this.state.painting.artist._id}`)
      .then(res => this.setState({ artist: res.data, limit: numberOfPaintingsDisplayed }));
  }


  render() {
    if(!this.state.painting) return null;
    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="title is-3">{ this.state.painting.title }</h1>

            <div>
              <div className="row">
                <div className="page-banner col-md-12">
                  {Auth.isAuthenticated() && <Link to={`/paintings/${this.state.painting._id}/edit`} className="button">
                    Edit
                  </Link>}
                  {Auth.isAuthenticated() && <button onClick={this.handleDelete} className="button is-danger">
                    Delete
                  </button>}
                </div>

              </div>
            </div>

          </div>

          <hr />
          <div className="container">


            <div className="section">
              <img src={ this.state.painting.image } alt={ this.state.painting.title } height="200" />

              <h1 className="title is-4">{ this.state.painting.title}</h1>

              <Link to={`/artists/${this.state.painting.artist.id}`} className="subtitle is-4">{ this.state.painting.artist.name}</Link>

              <br/>
              {this.state.painting.wikiLink && <a href={this.state.painting.wikiLink}>Wikipedia</a>}

            </div>
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

          <div className="columns is-multiline">
            {this.state.artist && this.state.artist.paintings.slice(0,this.state.limit).map(painting =>
              <li
                className="column is-one-third"
                key={painting._id}
              >
                <img src={ painting.image } alt={ painting.title } height="200" />
              </li>
            )}
          </div>
        </div>
      </section>

    );
  }
}

export default PaintingsShow;
