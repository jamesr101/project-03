import React from 'react';
import axios from 'axios';

import PaintingForm from './PaintingForm';
import Auth from '../lib/Auth';

class PaintingsNew extends React.Component {
  constructor() {
    super();
    this.state = { painting: {}, errors: {}, photo: '', artists: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);

  }
  componentDidMount() {
    axios.get('/api/artists/')
      .then(res => this.setState({ artists: res.data }));
  }
  handleChange(e) {
    let painting;
    if(['latitude', 'longitude'].includes(e.target.name)) {
      const location = { ...this.state.painting.location, [e.target.name]: e.target.value };
      painting = { ...this.state.painting, location };
    } else {
      painting = { ...this.state.painting, [e.target.name]: e.target.value };
    }

    const errors = { ...this.state.errors, [e.target.name]: null};
    this.setState({ painting, errors });

  }
  handleImage(e){
    const text = e.target.value;
    const painting = { ...this.state.painting, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: null};
    this.setState({ painting, errors, photo: text });
  }


  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post('/api/paintings', this.state.painting, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => this.props.history.push('/paintings'))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <PaintingForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        painting={this.state.painting}
        errors={this.state.errors}
        photo={this.state.photo}
        handleImage={this.handleImage}
        artists={this.state.artists}
      />
    );
  }
}

export default PaintingsNew;
