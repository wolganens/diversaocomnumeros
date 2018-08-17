import React from 'react';
import clockImage from '../imgs/relogio.png';
import hurryClockImage from '../imgs/relogiotempo.png';
import ReactAudioPlayer from 'react-audio-player';
import hurryUpSound from '../sons/dezSegundos.mp3';

export default class GameInfo extends React.Component {
  /*
    Método construtor do componente, envia para a superclasse
    os atributos recebidos e inicializa o estado do componente
  */
  constructor(props) {
    super(props)
    this.escondido = {
      position: 'absolute',
      opacity: 0
    }
    this.moreTimeCount = 0;
    this.state = {
      time: props.time || 60,
      hurryUp: false
    }
  }
  tick() {
    /*
      Este método é responsável por descontar 1 unidade do campo time no estado
      do componenente
    */    
    this.setState(prevState => ({
      time: prevState.time - 1
    }));
    /*A função que mantem o tempo de jogo salvo retorna um booleano indicando
    se deve ser acrescentado 15 segundos ao tempo (GAMB ATÉ UMA SOLUÇÃO MELHOR)*/
    const moreTime = this.props.saveOldTime(this.state.time);
    if (moreTime) {
      if (this.props.score > 0) {
        this.setState(prevState => ({
          time: prevState.time + ((15 - this.moreTimeCount) < 5 ? 5 : (15 - this.moreTimeCount))
        }));
        this.moreTimeCount++;
        this.props.buyTime();
      } else {
        alert('Você não tem pontos suficientes!');
      }
    }
    /*
      A partir dos 10 segundos restantes, liga o estado de "apuro",
      fazendo mudar a imagem do relógio
    */
    if (this.state.time <= 10) {
      if (!this.state.hurryUp) {
        this.hurryUpTime.audioEl.play();
        this.setState({
          hurryUp: true
        });
      }
    }

    /*
      Detecta se o jogo acabou por falta de tempo, se sim, limpa
      o contador
    */
    if (this.state.time <= 0) {
      this.props.onGameOver();
      clearInterval(this.interval);
    }
  }
  componentDidMount() {
    /*
      Quando o componente é montado, iniciamos um contador de segundos
      Nesse intervalo, dizemos que o método tick() do componente, será executado
      a cada 1 segundo (1000ms)
    */
    this.setState(prevState => {
      return null;
    })
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    /*
      Quando o componente for "desmontado" precisamos limpar o contador inicializado anteriormente
    */
    clearInterval(this.interval);
  }
  render() {    
    return (
      <div id="top-info">
        <div tabIndex="1" className="pull-left">Pontos: {this.props.score}</div>
        <div aria-hidden="true" className="pull-right">Tempo: {this.state.time}</div>
        <div aria-live="assertive" aria-atomic="false" aria-label={parseInt(((this.state.time)/10)+1, 10) + "0 segundos restantes"} style={this.escondido}></div>
        <div className="clearfix"></div>
        {this.state.hurryUp ? (
          <img id="clock-img" className="shake animated absolute" src={hurryClockImage} alt="relogio do tempo"/>
        ) : (
          <img id="clock-img" className="absolute" src={clockImage} alt="relogio do tempo"/>
        )}
        <ReactAudioPlayer
            src={hurryUpSound}
            ref={(element) => { this.hurryUpTime = element; }}
            autoPlay={false}
            className="hidden"
            controls
          />
      </div>
    )
  }
}
