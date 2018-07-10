import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <section className="quadroJogo text-center text-board">
        <div className="grand">Menu</div>
        <button
          onClick={this.props.onDisplayTutorial}
          className="button">
          Tutorial
        </button>
        <button
          onClick={this.props.onDisplayLevels}
          className="button">Dificuldade
        </button>
        <div className="grand">Jogo Pausado!</div>
        <button
          onClick={this.props.onResumeGame}
          className="button">Continuar Jogando
        </button>
      </section>
    );
  }
}