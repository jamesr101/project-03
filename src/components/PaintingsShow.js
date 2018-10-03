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
    this.addMore = this.addMore.bind(this);
  }

  componentDidMount() {
    const part = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
    axios.get(`/api/paintings/${this.props.match.params.id}`)
      .then(res => this.setState({ painting: res.data }))
      .then(() => {
        console.log(this.state.painting);
        if(this.state.painting){
          axios
            .get(part + this.state.painting.artist.wikiLink.slice(30))
            .then(res => this.setState({ wikil: res.data})).then(() =>
              console.log(this.state.wikil));

        }
      });


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

  addMore(e){
    e.preventDefault();
    let c;
    if(e.target.textContent === 'Show more'){
      c = this.state.limit + 3;
    } else if(this.state.limit < 3){
      c = 0;
    } else {
      c = this.state.limit - 3;
    }
    axios.get(`/api/artists/${this.state.painting.artist._id}`)
      .then(res => this.setState({ artist: res.data, limit: c }));
    console.log(this.state.artist);
    if(this.state.artist){
      console.log(this.state.artist.wikiLink.slice(30));
    }
  }


  render() {
    if(!this.state.painting) return null;
    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="title">{ this.state.painting.title }</h1>
            <div>
              <Link className="button" to={`/paintings/${this.state.painting._id}/edit`}> Edit </Link>
              <button
                className="button is-danger"
                onClick={this.handleDelete}
              >Delete</button>
            </div>

          </div>
          <hr />
          <div className="container">


            <div className="section">
              <img src={ this.state.painting.image } alt={ this.state.painting.title } height="200" />
            </div>
            <div className="section">
              <p>{ this.state.painting.artist.name}</p>
            </div>
            <div className="section">
              <p>{ this.state.painting.title}</p>
            </div>
            <div className="section">
              <p>{ this.state.painting.wikiLink}</p>
            </div>
          </div>
          <div className="columns">
            <button
              className="column button is-danger"
              onClick={this.addMore}
            >Show more</button>
            {this.state.limit > 0 &&
            <button
              className="column button is-danger"
              onClick={this.addMore}
            >Show less</button>
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
