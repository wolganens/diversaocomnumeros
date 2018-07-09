import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import disabledMusic from '../imgs/somDesativadoAzul.png';
import enabledMusic from '../imgs/somAtivadoAzul.png';
import clockImage from '../imgs/relogio.png';
import hurryClockImage from '../imgs/relogiotempo.png';
import '../css/game.css'

class GameInfo extends React.Component {
  /*
    Método construtor do componente, envia para a superclasse
    os atributos recebidos e inicializa o estado do componente
  */
  constructor(props) {
    super(props)
    this.state = {      
      time: 60,
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
        <div className="pull-left">Pontos: {this.props.points}</div>
        <div className="pull-right">Tempo: {this.state.time}</div>
        <div className="clearfix"></div>
        {this.state.hurryUp ? (
          <img id="clock-img" class="absolute right bottom" src={hurryClockImage} alt="relogio do tempo"/>
        ) : (
          <img id="clock-img" class="absolute right bottom" src={clockImage} alt="relogio do tempo"/>
        )}
      </div>
    )
  }
}

class GameQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: ''
    }
    this.onAnswer = this.onAnswer.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onAnswer(e) {
    e.preventDefault();    
    const { n1, n2, op } = this.props.question;    
    let result = null;
    switch (op) {
      case '+':
        result = n1 + n2;
        break;
      case '-':
        result = n1 - n2;
        break;
      case '*':
        result = n1 * n2;
        break;
      default:
        console.log('Algo de errado não está certo');
        break;
    }    
    if (this.state.answer === result) {
      this.props.onCorrentAnswer();
    } else {
      this.props.onIncorrectAnswer();
    }
    this.setState({
      answer: ''
    });
  }
  onInputChange(e) {
    e.preventDefault();
    const answer = parseInt(e.target.value, 10);
    if (isNaN(answer)) {
      this.setState({
        answer: ''
      })  
    } else {
      this.setState({
        answer: answer
      })
    }
  }
  render() {
    return (
      <div id="conta" className="big text-center">
        <span id="conta-valores">
          <span>{this.props.question.n1}</span>
          <span className="absolute left"> {this.props.question.op} </span>
          <span>{this.props.question.n2}</span>
        </span>
        <form action="#" id="answer-form" onSubmit={this.onAnswer}>
          <input
            className="small"
            placeholder="Insira a resposta"
            type="number"
            value={this.state.answer && parseInt(this.state.answer, 10)}
            onChange={this.onInputChange}
            disabled={this.props.gameOver}
          />
        </form>
      </div>
    )
  }
}
class GameActions extends React.Component {
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
class GameNav extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}
export default class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 4,
      points: 0,
      gameOver: false,      
    }
    this.onCorrentAnswer = this.onCorrentAnswer.bind(this);
    this.onIncorrectAnswer = this.onIncorrectAnswer.bind(this);
    this.onGameOver = this.onGameOver.bind(this);    
  }
  onCorrentAnswer() {
    /*
      Quando o jogador acerta uma resposta, incrementa 10 pontos
      e toca o som de resposta correta
    */
    this.setState(prevState => ({
      points: prevState.points + 10
    }));
    this.correct.audioEl.play()
  }
  onIncorrectAnswer() {
    this.error.audioEl.play()
  }
  onGameOver() {
    alert("Acabou =/");
    this.setState({
      gameOver: true
    })
  }  
  render() {
    return (
      <main className="borda">
        <section className="quadroJogo">
          <GameInfo
            onGameOver={this.onGameOver}            
            points={this.state.points}
          />
          <GameQuestion
            onCorrentAnswer={this.onCorrentAnswer}
            onIncorrectAnswer={this.onIncorrectAnswer}
            question={gerarNovaConta(this.state.points, this.state.level)}
            gameOver={this.state.gameOver}
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
      </main>
    );
  }
}

function gerarNovaConta (pontos, dificuldade) {
  let n1;
  let op;
  let n2;
  
  let probabilidadeSoma;
  let probabilidadeSubtracao;
  let probabilidadeMultiplicacao;
  let transportePermitido;
  let n1Maximo;
  let n2Maximo;
  
  /* com base na dificuldade */
  switch(dificuldade){
      case 1:
          probabilidadeSoma = 0.75;
          probabilidadeSubtracao = 0.25;
          probabilidadeMultiplicacao = 0.0;
          transportePermitido = false;
          n1Maximo = 50;
          n2Maximo = 50;
          break;
      case 2:
          probabilidadeSoma = 0.5;
          probabilidadeSubtracao = 0.5;
          probabilidadeMultiplicacao = 0.0;
          transportePermitido = true;
          n1Maximo = 100;
          n2Maximo = 100;
          break;
      case 3:
          probabilidadeSoma = 0.25;
          probabilidadeSubtracao = 0.25;
          probabilidadeMultiplicacao = 0.5;
          transportePermitido = true;
          n1Maximo = 500;
          n2Maximo = 500;
          break;
      /* em JavaScript, default pode estar no meio */
      default:
          probabilidadeSoma = (20 - (pontos/10)) >= 0 ? (10 - (pontos/10)) : 5;
          probabilidadeSubtracao = 3 + (pontos/12);
          probabilidadeMultiplicacao = 0 + (pontos/10);
          transportePermitido = true;
          n1Maximo = (pontos + 1)
          n2Maximo = (pontos + 1)
          const normalizador = probabilidadeSoma + probabilidadeSubtracao + probabilidadeMultiplicacao;
          probabilidadeSoma = probabilidadeSoma / normalizador;
          probabilidadeSubtracao = probabilidadeSubtracao / normalizador;
          probabilidadeMultiplicacao = probabilidadeMultiplicacao / normalizador;          
          break;        
  }
  
  /* define a operação */
  var probabilidade = Math.random();        
  if(probabilidade < probabilidadeSoma){
      op = "+";
  }else if(probabilidade < (probabilidadeSoma + probabilidadeSubtracao)){
      op = "-";
  }else if(probabilidade < (probabilidadeSoma + probabilidadeSubtracao + probabilidadeMultiplicacao)){
      op = "x";
  }else{
      /* jamais deveria chegar nesse ponto, mas tenho que usar essa 
       * verificação por segurança e lançar a exceção adequada */
      console.log("Problema na escolha de operação na Fábrica de contas: fora das probabilidades de escolha");
  }
  
  do{
      /* define os valores */
      if(op === "+"){
          n1 = Math.round(Math.random() * n1Maximo);
          n2 = Math.round(Math.random() * n2Maximo);
      }else if(op === "-"){
          do{
              n1 = Math.round(Math.random() * n1Maximo);
              n2 = Math.round(Math.random() * n2Maximo);
          /* impede resultados negativos */
          }while(n1 < n2);
      }else if(op === "x"){
          /* usa grandezas reduzidas (7% do valor) no caso de multiplicações */                
          n1 = Math.round(Math.random() * n1Maximo * 0.08);
          n2 = Math.round(Math.random() * n2Maximo * 0.04);
      }

      /* verifica se há transporte */
      var houveTransporte = false;
      var n1Array = n1.toString().split("");
      var n2Array = n2.toString().split("");
      /* adiciona zeros no começo dos números até que tenham o mesmo tamanho */
      while(n1Array.length !== n2Array.length){
          if(n1Array.length > n2Array.length){
              n2Array.unshift("0");
          }
          if(n1Array.length < n2Array.length){
              n1Array.unshift("0");
          }
      }
      /* debug */
      /* alert(transportePermitido);
      alert(n1);
      alert(op);
      alert(n2);
      alert(n1Array);
      alert(n2Array); */
      /* debug */
      for(var i = 0; i < n1Array.length; i++){
        switch(op){
          case "+":
            if((parseInt(n1Array[i], 10) + parseInt(n2Array[i], 10)) > 9){
              /* debug */
              /* alert("Transporte detectado em "+parseInt(n1Array[i])+" e "+parseInt(n2Array[i])+"!"); */
              /* debug */
              houveTransporte = true;
            }
            break;
          case "-":
            if((parseInt(n1Array[i], 10) - parseInt(n2Array[i], 10)) < 0){
              /* debug */
              /* alert("Transporte detectado em "+parseInt(n1Array[i])+" e "+parseInt(n2Array[i])+"!"); */
              /* debug */
              houveTransporte = true;
            }
            break;
          default:
            break;
        }
      }
  /* repete enquanto não for permitido transporte E houver transporte */
  }while(!transportePermitido && houveTransporte);
  
  /* instanciar, atualizar na View e devolver Conta */
  return {n1: parseInt(n1, 10), n2: parseInt(n2, 10), op};
}