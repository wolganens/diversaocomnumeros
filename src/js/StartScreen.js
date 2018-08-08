import React from 'react';
import '../css/animate.css'
export default class StartScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      exit: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.setState({
      loading: false
    });
  }
  render() {
    if (this.state.loading) {
      return <p className="text-center big">Carregando...</p>
    }
    return (
      <div className={this.state.exit ? 'zoomOutDown animated faster' : ''}>
        <header>
          <h1 tabIndex="1" className="start-title text-center big">
            <span className="bounceInDown animated text-primary block">
              <span aria-hidden="true">+</span> DIVERSÃO
            </span>
            <span className="bounceInLeft animated text-secondary block">COM</span>
            <span className="bounceInRight animated text-tertiary block">NÚMEROS
              <span aria-hidden="true">-</span>
            </span>
          </h1>
        </header>
        <nav className="bounceInUp animated game-nav text-center">
          <div className="btn-group">
            <button
              className="button"
              onClick={() => {this.setState({exit: true}); setTimeout(this.props.onStartGame, 400) }}
            >
              <span aria-hidden="true">▶</span> JOGAR
            </button>
            <button
              className="button"
              onClick={this.props.onDisplayTutorial}
            >
              TUTORIAL
            </button>
            <button
              className="button"
              onClick={this.props.onDisplayRanking}
            >
              PONTUAÇÕES
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
