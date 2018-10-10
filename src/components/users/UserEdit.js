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

  componentDidMount() {
    const token = Auth.getToken();
    axios
      .get(`/api/user/${Auth.getPayload().sub}`,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => this.setState({ user: res.data }))
      .then(() => console.log('this.state ----------->>', this.state));
  }

  handleChange(e) {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    const user = { ...this.state.user, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: '' };
    this.setState({ user, errors });
    console.log(this.state);
  }



  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    console.log(this.state.user);
    axios
      .put(`/api/user/${Auth.getPayload().sub}`, this.state.user,{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/profile'))
      //.then((err) => console.log(err))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title">Edit Profile</h1>

          <div className="field">
            <label className="label">Image</label>

            <div className="control">

              <ReactFilestack
                apikey={ FILESTACK_API_KEY }
                mode={'pick'}
                onSuccess={(response) => this.handleChange({
                  target: {
                    name: 'image',
                    value: response.filesUploaded[0].url
                  }})}
                onError={(e) => console.log(e)}
                buttonText={'Add Picture'}
                buttonClass={'button is-rounded'}
              />

              {this.state.errors.image && <small className="help is-danger"> {this.state.errors.image} </small>}
            </div>
          </div>
          <div className="section">
            <img src={ this.state.user.image } alt='upload a photo' height="200" />
          </div>


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
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
                  name="email"
                  placeholder="Name"
                  onChange={this.handleChange}
                  value={this.state.user.email  || ''}
                />
                {this.state.errors.name && <small className="help is-danger"> {this.state.errors.name} </small>}
              </div>
            </div>

            <button className="button is-rounded is-primary">Submit</button>
          </form>
        </div>
      </main>
    );
  }
}

export default UserEdit;
