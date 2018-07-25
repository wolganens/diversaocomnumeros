import React from 'react';

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
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
      <div>
        <header>
          <h1 tabindex="1" className="start-title text-center big">
            <span className="text-primary block">
            <span aria-hidden="true">+</span> DIVERSÃO</span>
            <span className="text-secondary block">COM</span>
            <span className="text-tertiary block">NÚMEROS <span aria-hidden="true">-</span></span>
          </h1>
        </header>
        <nav className="game-nav text-center">
          <div className="btn-group">
            <button
              className="button"
              onClick={this.props.onStartGame}
            >
              <span aria-hidden="true">▶</span> JOGAR
            </button>
            <button
              className="button"
              onClick={this.props.onDisplayTutorial}
            >
              TUTORIAL
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
