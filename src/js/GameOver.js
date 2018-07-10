import React from 'react';

export default class GameOver extends React.Component {  
  render() {
    return (
      <section className="quadroJogo text-center text-board">
        <div className="grand">Fim do Jogo!</div>
        <div className="medium">Sua pontuação foi:</div>
        <div className="grand text-center">{this.props.score}</div>
        <button
          onClick={this.props.onStartGame}
          className="button">Jogar novamente
        </button>
        <button
          onClick={this.props.onExitGame}
          className="button">Fechar jogo
        </button>
      </section>
    );
  }
}