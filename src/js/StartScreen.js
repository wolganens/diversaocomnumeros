import React from 'react';

export default class StartScreen extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 className="start-title text-center big">
            <span className="text-primary block">+ DIVERSÃO</span>
            <span className="text-secondary block">COM</span>
            <span className="text-tertiary block">NÚMEROS -</span>
          </h1>
        </header>
        <nav className="game-nav text-center">
          <div className="btn-group">
            <button
              className="button"
              onClick={this.props.onStartGame}
            >
              ▶ JOGAR
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