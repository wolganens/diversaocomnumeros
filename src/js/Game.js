import React from 'react';
import '../css/game.css'
import GameOver from './GameOver';
import StartScreen from './StartScreen';
import GamePlay from './GamePlay';
import GameNav from './GameNav';
import Tutorial from './Tutorial';
import Menu from './Menu';
import Level from './Level'

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
      TUTORIAL: 3,
      /*Tela de Jogo pausado*/
      PAUSED: 4,
      /*Seleção de Dificuldade*/
      LEVEL: 5,
    };
    this.state = {
      level: 4,
      score: 0,
      gameState: this.gameStates.START_SCREEN,
      tutorial: false,
      start: false,
      loading: true,
    }
    this.onCorrentAnswer = this.onCorrentAnswer.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
    this.renderMainSection = this.renderMainSection.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.onExitGame = this.onExitGame.bind(this);
    this.onDisplayTutorial = this.onDisplayTutorial.bind(this);
    this.onPauseGame = this.onPauseGame.bind(this);
    this.onResumeGame = this.onResumeGame.bind(this);
    this.saveOldTime = this.saveOldTime.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onDisplayLevel = this.onDisplayLevel.bind(this);
    this.onExitLevel = this.onExitLevel.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount () {
    this.setState({
      loading: false
    });
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
  onPauseGame() {
    this.setState(prevState => ({
      score: prevState.score,
      gameState: this.gameStates.PAUSED
    }));
  }
  onResumeGame() {
    this.setState(prevState => {
      return ({
        score: prevState.score,
        gameState: this.gameStates.PLAYING
      })
    });
  }
  onChangeLevel(level) {
    this.setState({
      level
    });
  }
  onDisplayLevel() {
    this.setState({
      gameState: this.gameStates.LEVEL
    });
  }
  onExitLevel() {
    this.setState({
      gameState: this.gameStates.PAUSED
    });
  }
  saveOldTime(time) {
    this.oldTime = time
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
          <div>
            <GamePlay
              onGameOver={this.onGameOver}
              score={this.state.score}
              onCorrentAnswer={this.onCorrentAnswer}
              onIncorrectAnswer={this.onIncorrectAnswer}
              isPaused={this.state.gameState === this.gameStates.PAUSED}
              saveOldTime={this.saveOldTime}
              oldTime={this.oldTime}
              level={this.state.level}
            />
            <GameNav>
              <button
                tabIndex="6"
                className="button"
                onClick={this.onPauseGame}
              >
                Pausar
              </button>
            </GameNav>
          </div>
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
            onStartGame={this.onResumeGame}
          />
        )
      case this.gameStates.PAUSED:
        return (
          <Menu
            onDisplayTutorial={this.onDisplayTutorial}
            onResumeGame={this.onResumeGame}
            onDisplayLevel={this.onDisplayLevel}
          />
        )
      case this.gameStates.LEVEL:
        return (
          <Level
            onChangeLevel={this.onChangeLevel}
            onExitLevel={this.onExitLevel}
            level={this.state.level}
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
