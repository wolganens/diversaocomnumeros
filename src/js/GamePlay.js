import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import GameInfo from './GameInfo';
import GameQuestion from './GameQuestion';
import GameActions from './GameActions';
import GameNav from './GameNav';
import { CalcFactory } from './Utils';

export default class GamePlay extends React.Component {
  constructor(props) {
    super(props)
    this.incorrectHandler = this.incorrectHandler.bind(this);
    this.correctHandler = this.correctHandler.bind(this);
    this.factory = new CalcFactory();
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
      <section className="fadeIn animated faster quadroJogo">
        <div id="game-wrapper">
          <GameInfo
            onGameOver={this.props.onGameOver}
            score={this.props.score}
            isPaused={this.props.isPaused}
            saveOldTime={this.props.saveOldTime}
            time={this.props.oldTime}            
          />
          <GameQuestion
            onCorrentAnswer={this.correctHandler}
            onIncorrectAnswer={this.incorrectHandler}
            question={this.factory.make(this.props.score, this.props.level)}
            isPaused={this.props.isPaused}
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
        </div>
      </section>
    );
  }
}
