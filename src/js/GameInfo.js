import React from 'react';
import clockImage from '../imgs/relogio.png';
import hurryClockImage from '../imgs/relogiotempo.png';

export default class GameInfo extends React.Component {
  /*
    Método construtor do componente, envia para a superclasse
    os atributos recebidos e inicializa o estado do componente
  */
  constructor(props) {
    super(props)
    this.state = {      
      time: 5,
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
    /*
      A partir dos 10 segundos restantes, liga o estado de "apuro",
      fazendo mudar a imagem do relógio
    */
    if (this.state.time <= 10) {
      if (!this.state.hurryUp) {
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
        <div className="pull-left">Pontos: {this.props.score}</div>
        <div className="pull-right">Tempo: {this.state.time}</div>
        <div className="clearfix"></div>
        {this.state.hurryUp ? (
          <img id="clock-img" className="absolute right bottom" src={hurryClockImage} alt="relogio do tempo"/>
        ) : (
          <img id="clock-img" className="absolute right bottom" src={clockImage} alt="relogio do tempo"/>
        )}
      </div>
    )
  }
}