import React from 'react';
import ReactDOM from 'react-dom';
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

    ReactDOM.render(
      <div id="startscreen">
        <div tabIndex="1" id="tituloJogo">Diversão com Números</div>
        <div id="botaoJogar">Jogar</div>
      </div>
    , document.getElementById("ariaLabels"))

    return (
      <div className="borda">
        <header>
          <h1 aria-hidden="true" className="start-title text-center big" aria-labelledby="tituloJogo" >
            <span className="bounceInDown animated text-primary block"> + DIVERSÃO </span>
            <span className="bounceInLeft animated text-secondary block">COM</span>
            <span className="bounceInRight animated text-tertiary block">NÚMEROS - </span>
          </h1>
        </header>
        <nav className="bounceInUp animated game-nav text-center">
          <div className="btn-group">
            <button className="button" aria-labelledby="botaoJogar" onClick={() => {this.setState({exit: true}); setTimeout(this.props.onStartGame, 400) }} >
              ▶ JOGAR
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
