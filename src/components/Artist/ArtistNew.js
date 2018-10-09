import React from 'react';
import axios from 'axios';
import ArtistsForm from './ArtistsForm';
import Auth from '../../lib/Auth';


class ArtistsNew extends React.Component {
  constructor() {
    super();
    this.state = { artist: {}, errors: {}, wikiLink: '', wikiImg: '', wikiPar: '', wikiBorn: '', wikiDeath: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getArtistData = this.getArtistData.bind(this);
  }

  handleChange(e) {
    const artist = { ...this.state.artist, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: '' };
    const capital = artist.name.replace(/ /g, '_');
    const wikiLink = artist.name ? `https://en.wikipedia.org/wiki/${capital}` : '';

    this.setState({
      artist,
      errors,
      wikiLink
    });

  }

  getArtistData() {
    axios
      .get('/api/artsy/artists', {
        params: {
          search: this.state.artist.name
        }
      })
      .then((res)=> {
        this.setState({
          wikiImg: res.data._links.thumbnail.href,
          wikiPar: res.data.biography,
          wikiBorn: res.data.birthday,
          wikiDeath: res.data.deathday
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();

    axios
      .post('/api/artists', this.state.artist,{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/artists'))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <div>
        <h1 className="title">New Artist</h1>
        <ArtistsForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          getArtistData={this.getArtistData}
          artist={this.state.artist}
          errors={this.state.errors}
          wikiLink={this.state.wikiLink}
          wikiImg={this.state.wikiImg}
          wikiPar={this.state.wikiPar}
          wikiBorn={this.state.wikiBorn}
          wikiDeath={this.state.wikiDeath}
        />
      </div>
    );
  }
}

export default ArtistsNew;
