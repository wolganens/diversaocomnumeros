import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import GameInfo from './GameInfo';
import GameQuestion from './GameQuestion';
import GameActions from './GameActions';
import GameNav from './GameNav';

export default class GamePlay extends React.Component {
  constructor(props) {
    super(props)
    this.incorrectHandler = this.incorrectHandler.bind(this);
    this.correctHandler = this.correctHandler.bind(this);
  }
  incorrectHandler() {
    this.error.audioEl.play()
  }
  correctHandler() {
    this.props.onCorrentAnswer();
    this.correct.audioEl.play();
  }
  render() {
    return (
      <div className="classroom">
        <section className="fadeIn animated quadroJogo">
          <GameInfo
            onGameOver={this.props.onGameOver}
            score={this.props.score}
            isPaused={this.props.isPaused}
            saveOldTime={this.props.saveOldTime}
            time={this.props.oldTime}
            buyTime={this.props.buyTime}
          />
          <GameQuestion
            onCorrentAnswer={this.correctHandler}
            onIncorrectAnswer={this.incorrectHandler}
            isPaused={this.props.isPaused}
            score={this.props.score}
            level={this.props.level}
          />
          <GameActions/>
          <GameNav/>
          <ReactAudioPlayer
            src="/sons/acerto.mp3"
            ref={(element) => { this.correct = element; }}
            autoPlay={false}
            className="hidden"
            controls
          />
          <ReactAudioPlayer
            src="/sons/erro.mp3"
            ref={(element) => { this.error = element; }}
            autoPlay={false}
            className="hidden"
            controls
          />
        </section>
        <GameNav>
          <button
            tabIndex="6"
            className="button"
            onClick={this.props.onPauseGame}
          >
            Pausar
          </button>
          <button
            tabIndex="6"
            className="button"
            onClick={this.props.onMoreTime}
          >
            Mais tempo
          </button>
        </GameNav>
      </div>
    );
  }
}
