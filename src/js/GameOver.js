import React from 'react';

export default class GameOver extends React.Component {  
  render() {
    return (
      <div className="text-center text-board">
        <div className="grand">Fim do Jogo!</div>
        <div className="medium">Sua pontuação foi:</div>
        <div className="grand text-center">{this.props.score}</div>
        <button
          onClick={this.props.onPlayAgain}
          className="button">Jogar novamente
        </button>
        <button className="button">Fechar jogo</button>
      </div>
    );
  }
}