import React from 'react';
import axios from 'axios';

import PaintingForm from './PaintingForm';
import Auth from '../../lib/Auth';

class PaintingsNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { painting: {}, errors: {}, photo: '', artists: [], address: '', findingAddress: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.findAddress = this.findAddress.bind(this);

  }
  componentDidMount() {
    axios.get('/api/artists/')
      .then(res => this.setState({ artists: res.data }));
  }
  handleChange(e) {
    console.log(e);
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
  // handleImage(e){
  //   const text = e.target.value;
  //   const painting = { ...this.state.painting, [e.target.name]: e.target.value };
  //   const errors = { ...this.state.errors, [e.target.name]: null};
  //   this.setState({ painting, errors, photo: text });
  // }



  getLocation() {

    if (navigator.geolocation) {
      this.setState({ findingAddress: true });
      navigator.geolocation.getCurrentPosition(position => {
        const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        const painting = { ...this.state.painting, location };
        this.setState({ painting, findingAddress: false }, () => console.log(this.state.painting));
      });
    } else {
      this.setState({ message: 'Cannot establish your location' });
    }
    // if location = {lat: 39.78373, lng: -100.445882}, error "address not found"
  }

  findAddress() {
    const KEY = 'UylkKlLKXG8WP4fG0IlsUewrzpdpkfPp';

    axios
      .get('http://open.mapquestapi.com/geocoding/v1/address', {
        params: {
          key: KEY,
          location: this.state.painting.address
        }
      })
      .then(res => {
        console.log( res);
        const { lat: latitude, lng: longitude } = res.data.results[0].locations[0].latLng;
        const location = { latitude, longitude };

        if(location.latitude ===  39.78373 && location.longitude === -100.445882){
          const errors = { ...this.state.errors, address: 'Cannot find address'};
          return this.setState({ errors });
        }

        const painting = { ...this.state.painting, location };
        this.setState({ painting }, () => console.log(this.state.painting));


      });

    console.log('request made to open map');


  }


  handleSubmit(e) {
    console.log(this.state.painting);
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post('/api/paintings', this.state.painting, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => this.props.history.push(`/paintings/${res.data._id}`))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title">Add Painting</h1>
          <PaintingForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            painting={this.state.painting}
            errors={this.state.errors}
            //photo={this.state.photo}
            //handleImage={this.handleImage}
            artists={this.state.artists}
            getLocation={this.getLocation}
            findAddress={this.findAddress}
            findingAddress={this.state.findingAddress}
            selectedArtist={this.props.location.state && this.props.location.state.artist}
          />
        </div>
      </main>
    );
  }
}

export default PaintingsNew;
