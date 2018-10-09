import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ArtistCard from './ArtistCard';

class ArtistIndex extends React.Component {
  constructor() {
    super();
    this.state = {artists: []};

  }

  componentDidMount(){
    axios.get('/api/artists')
      .then(res => this.setState({ artists: res.data }));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title"> Artist </h1>
          <ul className="columns is-multiline">
            {this.state.artists.map(artist =>
              <li
                className="column is-one-quarter-desktop is-one-third-tablet"
                key={artist._id}
              >
                <Link to={`/artists/${artist._id}`}>
                  <ArtistCard {...artist} />
                </Link>
              </li>
            )}
            <li className="column is-one-quarter-desktop is-one-third-tablet">
              <Link to={'/artists/new'}>
                <ArtistCard {...{name: '+ Add new artist', image: '../../assets/images/add-icon.png'}}/>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    );
  }
}

export default ArtistIndex;
