import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class UserShow extends React.Component {
  constructor() {
    super();
    this.state = { user: null };

  }

  componentDidMount() {
    const token = Auth.getToken();
    axios
      .get(`/api/user/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => this.setState({ user: res.data }))
      .then(() => console.log('this.state ----------->>', this.state));
  }



  render() {
    if(!this.state.user) return null;
    return (
      <section className="section">
        <div className="container">

          <hr />
          <div className="columns is-multiline">
            <div className="column is-half">
              <h1 className="title">User: { this.state.user.username }</h1>
              <hr />
              <h5 className="title is-5">Task until next trophy:</h5>


            </div>
            <div className="column is-half">

              <h5 className="title is-5">Trophies</h5>
              <ul>
                { this.state.user.trophies.length > 1 ? this.state.user.trophies.map(trophy =>
                  <li key={trophy._id}>Trophy: { trophy }</li>
                ) : <p>Upload some pictures to earn trophies</p>}
              </ul>
              <hr />

            </div>
          </div>
          <hr />
          <h5 className="title is-5">Friends</h5>
          <ul>
            { this.state.user.friends ? this.state.user.friends.map(friend =>
              <li key={friend._id}>Trophy: { friend }</li>
            ) : <p>Connect with friends</p>}
          </ul>

          <hr />

          <h5 className="title is-5">Paintings loaded</h5>
          <ul>
            { this.state.user.paintingsUploaded ? this.state.user.paintingsUploaded.map(paintings =>
              <li key={paintings._id}>Trophy: { paintings }</li>
            ) : <p>Upload paintings (link to paintings new page)</p>}
          </ul>

          <hr />

          <h5 className="title is-5">Followed Artists</h5>
          <ul>
            { this.state.user.artistFollowed.lenth>1 ? this.state.user.artistFollowed.map(artist =>
              <li key={artist._id}>Trophy: { artist }</li>
            ) : <p>Follow artists (link to artists index page)</p>}
          </ul>

        </div>
      </section>
    );
  }
}

export default UserShow;
