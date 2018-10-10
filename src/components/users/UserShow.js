import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class UserShow extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
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



  render() {
    if(!this.state.user) return null;
    return (
      <main className="section">
        <div className="container">

          <div className="container is-fluid columns">

            <div className="column is-one-third has-text-centered">
              <figure className="image profile-picture is-128x128">
                <img className="is-rounded" src={ this.state.user.image } />
              </figure>

              <h1 className="title">{ this.state.user.username }</h1>

              <p>{ this.state.user.email }</p>

              <br/>


              <progress className="progress is-info" value={ this.state.user.paintingsUploaded.length } max="10"></progress>
              <p>You uploaded <strong> { this.state.user.paintingsUploaded.length } </strong> painting </p>

              <span className="icon is-medium	">
                <i className="far fa-edit"></i>
              </span>

              <a href={'/profile/' + this.state.user._id + '/edit'} className="button is-text">
                Edit
              </a>
            </div>

            <div className="column is-two-thirds">

              <h5 className="title is-5">Friends</h5>
              <ul>
                { this.state.user.friends ? this.state.user.friends.map(friend =>
                  <li key={friend._id}>Trophy: { friend }</li>
                ) : <p>Connect with friends</p>}
              </ul>

              <hr />

              <h5 className="title is-5">Trophies</h5>
              <ul>
                { this.state.user.trophies.length > 1 ? this.state.user.trophies.map(trophy =>
                  <li key={trophy._id}>Trophy: { trophy }</li>
                ) : <p>Upload some pictures to earn trophies</p>}
              </ul>

              <hr />

              <h5 className="title is-5">Paintings Uploaded</h5>

              { this.state.user.paintingsUploaded ? this.state.user.paintingsUploaded.map(paintings =>
                <Link key={paintings._id} to={`/paintings/${paintings._id}`}>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <img src={ paintings.image } alt={ paintings.title } />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-6">{ paintings.title }</p>
                          <p className="subtitle is-7">{ paintings.info }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : <p>Upload paintings (link to paintings new page)</p>}


              <hr />

              <h5 className="title is-5">Followed Artists</h5>
              <ul>
                { this.state.user.artistFollowed.lenth>1 ? this.state.user.artistFollowed.map(artist =>
                  <li key={artist._id}>Trophy: { artist }</li>
                ) : <p>Follow artists (link to artists index page)</p>}
              </ul>

              <hr />

            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default UserShow;
