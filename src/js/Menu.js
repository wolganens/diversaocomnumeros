import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <section className="quadroJogo text-center text-board">
        <div className="grand">Menu</div>
        <div className="btn-group">
          <button
            onClick={this.props.onDisplayTutorial}
            className="button">
            Tutorial
          </button>
          <button
            onClick={this.props.onDisplayLevel}
            className="button">Dificuldade
          </button>
          <div tabIndex="1" className="grand">Jogo Pausado!</div>
          <button
            onClick={this.props.onResumeGame}
            className="button">Continuar Jogando
          </button>
        </div>
      </section>
    );
  }
}
