import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import disabledMusic from '../imgs/somDesativadoAzul.png';
import enabledMusic from '../imgs/somAtivadoAzul.png';

export default class GameActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enabledMusic: false
    }
    this.disableMusic = this.disableMusic.bind(this);
    this.enableMusic = this.enableMusic.bind(this);
  }
  disableMusic() {
    this.setState({
      enabledMusic: false
    })
    this.music.audioEl.pause()
  }
  enableMusic() {
    this.setState({
      enabledMusic: true
    })
    this.music.audioEl.play()
  }
  render() {
    return (
      <div id="game-actions">
        {this.state.enabledMusic ? (
          <button
            id="enabled-sound"
            className="clean pull-left"
            onClick={this.disableMusic}>
              <img className="img-responsive" src={enabledMusic} alt="Pausar música de fundo"/>
          </button>
        ) : (
          <button
            id="disabled-sound"
            className="clean pull-left"
            onClick={this.enableMusic}>
              <img className="img-responsive" src={disabledMusic} alt="Pausar música de fundo"/>
          </button>
        )}        
        <ReactAudioPlayer
            src="/sons/Bubble_Bath.mp3"
            ref={(element) => { this.music = element; }}
            autoPlay={false}
            className="hidden"
            controls
            loop={true}
          />
        <div className="clearfix"></div>
      </div>
    )
  }
}