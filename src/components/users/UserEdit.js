import React from 'react';
import axios from 'axios';
import ReactFilestack from 'react-filestack';

const FILESTACK_API_KEY = 'Avqe4wSLLQlWD6gW9ymKgz';

import Auth from '../../lib/Auth';


class UserEdit extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    const user = { ...this.state.user, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: '' };
    this.setState({ user, errors });
  }



  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();

    axios
      .post('/api/users', this.state.user,{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/users'))
      //.then((err) => console.log(err))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <div>
        <h1>Edit Profile</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">username</label>
            <div className="control">
              <input
                className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
                name="username"
                placeholder="Name"
                onChange={this.handleChange}
                value={this.state.user.username  || ''}
              />
              {this.state.errors.name && <small className="help is-danger"> {this.state.errors.name} </small>}
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>

            <div className="control">

              <ReactFilestack
                apikey={ FILESTACK_API_KEY }
                mode={'pick'}
                onSuccess={(response) => this.state.handleChange({
                  target: {
                    name: 'image',
                    value: response.filesUploaded[0].url
                  }})}
                onError={(e) => console.log(e)}
                buttonText={'Add Picture'}
              />

              {this.state.errors.image && <small className="help is-danger"> {this.state.errors.image} </small>}
            </div>
          </div>
          <div className="section">
            <img src={ this.state.user.image } alt='upload a photo' height="200" />
          </div>

          <button className="button is-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserEdit;
