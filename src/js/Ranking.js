import React from 'react';
import GameNav from './GameNav';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    /*Recupera as pontuações e atualiza o estado do componente*/
    let scores = localStorage.getItem('scores');
    if (scores) {
      scores = JSON.parse(scores);
      /*Ordena as pontuações*/
      scores.sort(function (a, b) {
        return b.score - a.score;
      });

      this.setState({
        scores
      });
    }
  }
  render() {    
    if (this.state.scores.length === 0) {
      return (
        <div>
          <p className="big">Não há pontuações salvas.</p>
          <GameNav>
            <button onClick={this.props.onStartGame} className="button"> Jogar </button>
            <button onClick={this.props.onExitGame} className="button"> Voltar </button>
          </GameNav>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Pontuações:</h1>
          <ul>
            {this.state.scores.map( (score, index) => (
              <li key={index} className="medium">{`${score.name}: ${score.score}`}</li>
            ))}
          </ul>
          <GameNav>
            <button onClick={this.props.onStartGame} className="button"> Jogar </button>
            <button onClick={this.props.onExitGame} className="button"> Voltar </button>
          </GameNav>
        </div>
      );
    }
  }
}