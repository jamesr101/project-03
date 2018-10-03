import React from 'react';
import axios from 'axios';
import ArtistsForm from './ArtistsForm';

import Auth from '../../lib/Auth';

class ArtistsNew extends React.Component {
  constructor() {
    super();
    this.state = { artist: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const artist = { ...this.state.artist, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: '' };
    this.setState({ artist, errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();

    axios
      .post('/api/artists', this.state.artist,{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/artists'))
      //.then((err) => console.log(err))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <div>
        <h1>New Artist</h1>
        <ArtistsForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          artist={this.state.artist}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default ArtistsNew;
