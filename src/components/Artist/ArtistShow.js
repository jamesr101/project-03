import React from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';
// import Auth from '../../lib/Auth';

class ArtistsShow extends React.Component {
  constructor() {
    super();
    this.state = { artist: null};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    console.log('componentDidMount');

    axios.get(`/api/artists/${this.props.match.params.id}`)
      .then(res => this.setState({ artist: res.data }));
  }

  handleDelete() {
    const token = localStorage.getItem('token');
    axios
      .delete(`/api/artists/${this.props.match.params.id}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/artists'));
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
            {/* {Auth.isAuthenticated() && Auth.getPayload().sub === this.state.artist.user._id &&<div>
              <Link className="button" to={`/artists/${this.state.artist._id}/edit`}>Edit</Link>
              <button className="button is-danger" onClick={this.handleDelete}> Delete </button>
            </div>} */}
          </div>

          <hr />

          <div className="column is-half">
            <img src={ this.state.artist.image } alt={ this.state.artist.name } height="200" />
          </div>
        </div>

      </section>

    );
  }
}

export default ArtistsShow;
