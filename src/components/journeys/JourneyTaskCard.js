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
    this.handleStatus = this.handleStatus.bind(this);
  }

  handleChange(data) {
    console.log(data);
    this.handleStatus(1);
    const token = Auth.getToken();
    axios
      .post('/api/paintings/checkmatching', data, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(el => el.data.isMatch ? this.handleStatus(2) : this.handleStatus(-1))
      .catch((err) => this.setState({ errors: err.response.data.errors }));

  }

  handleStatus(status) {
    switch(status){
      case 1: // Loading - sended request and wait to answer
        this.setState({ status: 1});
        break;
      case 2: // Done - the photo match to painting
        this.setState({ status: 2});
        this.state.taskDone();
        break;
      case -1: // not match photo
        this.setState({ status: -1});
        break;


    }

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
            <div className="card-content has-text-centered">
              <div className="media">
                <div className="content has-text-centered">
                  <p className="title is-3">{ this.state.title }</p>
                  <p className="is-6 has-text-centered">{ this.state.content }</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'FindPainting':
        return(
          <div className="card">
            <div className="card-content">
              <p className="title is-3">{ this.state.title }</p>
              <div className="media">

                <div className="media-left">
                  <figure className="image is-128x128">
                    <img src={ this.state.painting.image } alt={ this.state.painting.title } />
                  </figure>

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
                        buttonClass={'button is-rounded task-stat'}
                      />
                      {(this.state.status === -1) &&
                        <p> Please upload match photo </p>}
                    </div>:
                    (this.state.status === 1) ?
                      <button className="button is-rounded is-loading task-stat">Loading</button>:
                      (this.state.status === 2) ?
                        <figure className="image is-64x64 task-stat">
                          <img src='/assets/images/success.svg' alt='success' />
                        </figure> :
                        <p> error </p>
                  }

                </div>

                <div className="media-content">

                  <p className="is-6">{ this.state.content }</p>
                </div>


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
