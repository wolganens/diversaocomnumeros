import React from 'react';

export default class StartScreen extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 className="text-center big">
            <span className="text-primary block">+ DIVERSÃO</span>
            <span className="text-secondary block">COM</span>
            <span className="text-tertiary block">NÚMEROS -</span>
          </h1>
        </header>
        <nav className="text-center">
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
        </nav>
      </div>
    );
  }
}