import React from 'react';
import '../css/game.css'
import GameOver from './GameOver';
import StartScreen from './StartScreen';
import GamePlay from './GamePlay';
import Tutorial from './Tutorial';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    
    this.gameStates = {
      /*Tela inicial do jogo*/
      START_SCREEN: 0,
      /*Jogo em andamento*/
      PLAYING: 1,
      /*Fim do jogo*/
      GAMEOVER: 2,
      /*Tela de tutorial*/
      TUTORIAL: 3
    };
    this.state = {
      level: 4,
      score: 0,
      gameState: this.gameStates.START_SCREEN,
      tutorial: false,
      start: false
    }
    this.onCorrentAnswer = this.onCorrentAnswer.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
    this.renderMainSection = this.renderMainSection.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.onExitGame = this.onExitGame.bind(this);
    this.onDisplayTutorial = this.onDisplayTutorial.bind(this);
  }
  onCorrentAnswer() {
    /*
      Quando o jogador acerta uma resposta, incrementa 10 pontos
      e toca o som de resposta correta
    */
    this.setState(prevState => ({
      score: prevState.score + 10
    }));    
  }
  onGameOver() {
    this.setState({
      gameState: this.gameStates.GAMEOVER
    });
  }
  onStartGame() {
    this.setState({
      score: 0,
      gameState: this.gameStates.PLAYING
    });
  }
  onExitGame() {
    this.setState({
      score: 0,
      gameState: this.gameStates.START_SCREEN
    });
  }
  onDisplayTutorial() {
    this.setState({
      gameState: this.gameStates.TUTORIAL
    });
  }
  renderMainSection() {
    /*Renderiza a janela principal do jogo de acordo com o estado atual*/
    switch (this.state.gameState) {
      case this.gameStates.START_SCREEN:
        return (
          <StartScreen
            onStartGame={this.onStartGame}
            onDisplayTutorial={this.onDisplayTutorial}     
          />
        );
      case this.gameStates.PLAYING:
        return (
          <GamePlay
            onGameOver={this.onGameOver}
            score={this.state.score}
            onCorrentAnswer={this.onCorrentAnswer}
            onIncorrectAnswer={this.onIncorrectAnswer}
          />
        );
      case this.gameStates.GAMEOVER:
        return (
          <GameOver
            score={this.state.score}
            onStartGame={this.onStartGame}
            onExitGame={this.onExitGame}
          />
        );
      case this.gameStates.TUTORIAL:
        return (
          <Tutorial
            onStartGame={this.onStartGame}
          />
        )
      default:
        return (<div></div>);
    }
  }
  render() {
    return (
      <main className="borda">        
        {this.renderMainSection()}
      </main>
    );
  }
}

