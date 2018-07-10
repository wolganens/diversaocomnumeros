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
      <section className="quadroJogo">
        <GameInfo
          onGameOver={this.props.onGameOver} 
          score={this.props.score}
        />
        <GameQuestion
          onCorrentAnswer={this.correctHandler}
          onIncorrectAnswer={this.incorrectHandler}
          question={gerarNovaConta(this.props.score, this.props.level)}
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