import React from 'react';
import ReactFilestack from 'react-filestack';
import axios from 'axios';
import Auth from '../../lib/Auth';

const FILESTACK_API_KEY = 'Avqe4wSLLQlWD6gW9ymKgz';

class JourneyTaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props, status: 0};
    console.log('constructor this.state');
    console.log(this.state);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    console.log(data);
    this.setState({ status: 1});
    const token = Auth.getToken();
    axios
      .post('/api/paintings/checkmatching', data, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(el => el.data.isMatch ? this.setState({ status: 2}) : this.setState({ status: -1}))
      .then( () => {
        console.log('handleChange 3  this.state');
        console.log(this.state);
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));

  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  render() {
    console.log('render');
    switch(this.state.type) {
      case 'Info':
        return(
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="content">
                  <p className="title is-3">{ this.state.title }</p>
                  <p className="subtitle is-6">{ this.state.content }</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'FindPainting':
        return(
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-128x128">
                    <img src={ this.state.painting.image } alt={ this.state.painting.title } />
                  </figure>
                </div>

                <div className="media-content">
                  <p className="title is-3">{ this.state.title }</p>
                  <p className="subtitle is-6">{ this.state.content }</p>
                </div>

                {(this.state.status <= 0) ?
                  <div>
                    <ReactFilestack
                      apikey={ FILESTACK_API_KEY }
                      mode={'pick'}
                      onSuccess={(response) => this.handleChange({
                        paintingId: this.state.painting._id,
                        photoUrl: response.filesUploaded[0].url
                      })}
                      onError={(e) => console.log(e)}
                      buttonText={'Take Photo'}
                    />
                    {(this.state.status === -1) &&
                      <p> Please upload mutch photo </p>}
                  </div>:
                  (this.state.status === 1) ?
                    <a className="button is-loading">Loading</a>:
                    (this.state.status === 2) ?
                      <figure className="image is-32x32">
                        <img src='/assets/images/success.svg' alt='success' />
                      </figure> :
                      <p> error </p>
                }
              </div>
            </div>
          </div>
        );

      default:
        return(<p> error </p>);
    }
  }
}

export default JourneyTaskCard;
