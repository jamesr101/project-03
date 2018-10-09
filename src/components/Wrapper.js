import React from 'react';


class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.setState( {
      offsetX: '',
      offsetY: '',
      friction: 1 / 32
    });
    this._mouseMove = this._mouseMove.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this._mouseMove);
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this._mouseMove);
  }

  _mouseMove(e) {
    const followX = (window.innerWidth / 2 - e.clientX);
    const followY = (window.innerHeight / 2 - e.clientY);

    let x = 0,
      y = 0;
    x +=( (-followX - x) * this.state.friction);
    y += (followY - y) * this.state.friction;
    this.setState({
      offsetX: x,
      offsetY: y
    });
  }
  render() {
    const offset = {
      transform: `translate(-50%, -50%) perspective(600px)
                  rotateY(${this.state.offsetX}deg)
                  rotateX(${this.state.offsetY}deg)`
    };

    return (
      <div className='wrapper' style={offset}>
        <div className="shape">
        </div>
        <div className="shape2">
        </div>
        <p>Move your mouse or finger around</p>
      </div>
    );
  }

}
export default Wrapper;
// ReactDOM.render(<Wrapper />, document.getElementById('app'));
