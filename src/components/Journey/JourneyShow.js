import React from 'react';
import axios from 'axios';
import ReactFilestack from 'react-filestack';
import Auth from '../../lib/Auth';

const FILESTACK_API_KEY = 'Avqe4wSLLQlWD6gW9ymKgz';


// import { Link } from 'react-router-dom';
// import Auth from '../../lib/Auth';

class JourneysShow extends React.Component {
  constructor() {
    super();
    this.state = { journey: null};
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    console.log('componentDidMount');

    axios.get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => this.setState({ journey: res.data }));
  }

  handleChange(e) {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    // const state = { ...this.state, [e.target.name]: e.target.value };
    const token = Auth.getToken();

    axios
      .post('/api/journeys/checkphoto', {photoUrl: e.target.value},{
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(el => console.dir(el.data))

      // .then(() => this.props.history.push('/artists'))
      //.then((err) => console.log(err))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }




  componentDidUpdate() {
    console.log('componentDidUpdate');

  }

  render() {
    if(!this.state.journey) return null;
    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="title">{ this.state.journey.title }</h1>
          </div>

          <hr />
          <div className="columns">

            <div className="column is-one-quarter">
              <img src={ this.state.journey.image } alt={ this.state.journey.name } height="200" />
            </div>

            <div className="column is-three-quarters">
              <p>
                { this.state.journey.info }
              </p>
              <br />
            </div>
          </div>
        </div>

        <ul>
          {this.state.journey.tasks.map(task =>
            <li key={task._id}>

              <p> { task.title } </p>
              <p> { task.content } </p>
              {(task.type === 'FindPainting') &&
                <ReactFilestack
                  apikey={ FILESTACK_API_KEY }
                  mode={'pick'}
                  onSuccess={(response) => this.handleChange({
                    target: {
                      name: task._id,
                      value: response.filesUploaded[0].url
                    }})}
                  onError={(e) => console.log(e)}
                  buttonText={'Add Picture'}
                />
              }

              {/* <figure> <img src={ task.image }/> </figure> */}


            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default JourneysShow;
