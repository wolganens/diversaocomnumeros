import React from 'react';
import imgTelaInicial from '../imgs/telaInicial.PNG';
import imgSomAtivadoAzul from '../imgs/somAtivadoAzul.png';
import imgTelaMenu from '../imgs/telaMenu.png';
import imgTelaDificuldade from '../imgs/telaDificuldade.png';
import imgTelaPausarJogo from '../imgs/telaPausarJogo.png';
import ReactAudioPlayer from 'react-audio-player';
import imgTelaJogoPausado from '../imgs/telaJogoPausado.png';
import imgTelaFimJogo from '../imgs/telaFimJogo.png';
import GameNav from './GameNav';

import '../css/tutorial.css';


export default class Tutorial extends React.Component {
  constructor(props) {
    super(props)
    this.tutorials = [
      {
        title: 'Tela inicial',
        view: () =><TelaInicial/>
      },
      {
        title: 'Música e avisos sonoros',
        view : () => <MusicaAvisosSonoros/>
      },
      {
        title: 'Tela do jogo',
        view: () => <TelaJogo/>
      },
      {
        title: 'Menu',
        view: () => <Menu/>
      },
      {
        title: 'Dificuldade',
        view: () => <Dificuldade/>
      },
      {
        title: 'Jogar',
        view: () => <Jogar/>
      },
      {
        title: 'Pausar jogo',
        view: () => <Pausar/>
      },
      {
        title: 'Tela fim do jogo',
        view: () => <FimJogo/>
      },
      {
        title: 'Atalhos',
        view: () => <Atalhos/>
      },
    ]
    this.state = {
      selected: null
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.renderTutorial = this.renderTutorial.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }
  handleNext() {
    if(this.state.selected == null) {
      this.setState({
        selected: 0
      });
    } else {
      this.setState(prevState => ({
        selected: prevState.selected + 1
      }));
    }
  }
  handlePrev() {
    if(this.state.selected === 0) {
      this.setState({
        selected: null
      });
    } else {
      this.setState(prevState => ({
        selected: prevState.selected - 1
      }));
    }
  }
  changeHandler(selected) {
    this.setState({
      selected
    });
  }
  renderTutorial() {
    const View = this.tutorials[this.state.selected].view;
    return <View/>;
  }
  render() {
    return (
      <div>
        <header>
          <h1 tabindex="1" >{this.state.selected == null ? 'Tutorial' : this.tutorials[this.state.selected].title}</h1>
        </header>
        {this.state.selected == null ? (
          <nav tabindex="2">
            <ul id="linksTopicos">
              {this.tutorials.map((tutorial, index) =>
                <li key={index}>
                  <button
                    onClick={() => {this.changeHandler(index)}}
                    className="clean"
                    title={tutorial.title}>{tutorial.title}</button>
                </li>
              )}
            </ul>
          </nav>
        ) : (
          <div>
            <section>
              {this.renderTutorial()}
            </section>
          </div>
        )}
        <GameNav>
          { this.state.selected != null &&
            <button
              className="button"
              onClick={()=>{this.setState({selected: null})}}
            >
                Tutorial
            </button>
          }
          <button
            className="button"
            onClick={this.props.onStartGame}
          >
            Jogar
          </button>
          {this.state.selected != null && (
            <span>
              <button
                className="button"
                onClick={this.handlePrev}
              >
                Anterior
              </button>
              <button
                className="button"
                onClick={this.handleNext}
                disabled={this.state.selected === this.tutorials.length - 1}
              >
                Próximo
              </button>
            </span>
            )
          }
        </GameNav>
      </div>
    );
  }
}

function TelaInicial() {
  return (
    <div>
      <img src={imgTelaInicial} alt="imagem da tela inicial"/>
      <p>Botão Tutorial: Abre o tutorial do jogo.</p>
      <p>Botão Jogar: Abre a tela de jogo.</p>
    </div>
  );
}
class MusicaAvisosSonoros extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <ReactAudioPlayer
            src="/sons/inicio.mp3"
            ref={(element) => { this.inicio = element; }}
            autoPlay={false}
            className="hidden"
            controls
            loop={false}
          />
          <button
            className="somIcone"
            id="iconeSomIncio"
            onClick={()=>{this.inicio.audioEl.play()}}
            >
            <img src={imgSomAtivadoAzul} alt="icone de som aviso inicio jogo"/>
              Início do jogo.
          </button>
        </li>
        <li>
          <ReactAudioPlayer
            src="/sons/musica.mp3"
            ref={(element) => { this.fundo = element; }}
            autoPlay={false}
            className="hidden"
            controls
            loop={false}
          />
          <button
            className="somIcone"
            id="iconeSomMusica"
            onClick={()=>{this.fundo.audioEl.play()}}
            >
            <img src={imgSomAtivadoAzul} alt="icone de som música do jogo"/>
              Música de fundo.
          </button>
        </li>
        <li>
          <ReactAudioPlayer
            src="/sons/acerto.mp3"
            ref={(element) => { this.certa = element; }}
            autoPlay={false}
            className="hidden"
            controls
            loop={false}
          />
          <button
            className="somIcone"
            id="iconeSomAcerto"
            onClick={()=>{this.certa.audioEl.play()}}
            >
            <img src={imgSomAtivadoAzul} alt="icone de som acertos cálculo"/>
              Resposta certa.
          </button>
        </li>
        <li>
          <ReactAudioPlayer
            src="/sons/erro.mp3"
            ref={(element) => { this.errada = element; }}
            autoPlay={false}
            className="hidden"
            controls
            loop={false}
          />
          <button
            className="somIcone"
            id="iconeSomErro"
            onClick={()=>{this.errada.audioEl.play()}}
            >
            <img src={imgSomAtivadoAzul} alt="icone de som erro do cálculo"/>
              Resposta errada.
          </button>
        </li>
        <li>
          <ReactAudioPlayer
            src="/sons/dezSegundos.mp3"
            ref={(element) => { this.dezSeg = element; }}
            autoPlay={false}
            className="hidden"
            controls
            loop={false}
          />
          <button
            className="somIcone"
            id="iconeSomTempoAcab"
            onClick={()=>{this.dezSeg.audioEl.play()}}
            >
            <img src={imgSomAtivadoAzul} alt="icone de som aviso tempo 10 segundos"/>
              Tempo acabando.
          </button>
        </li>
        <li>
          <ReactAudioPlayer
            src="/sons/fimJogo.mp3"
            ref={(element) => { this.fimJogo = element; }}
            autoPlay={false}
            className="hidden"
            controls
            loop={false}
          />
          <button
            className="somIcone"
            id="iconeSomFimJogo"
            onClick={()=>{this.fimJogo.audioEl.play()}}
            >
            <img src={imgSomAtivadoAzul} alt="icone de som aviso fim de jogo"/>
              Fim de jogo.
          </button>
        </li>
      </ul>
    );
  }
}
function TelaJogo() {
  return (
    <div>
      <img src={imgTelaMenu} alt="imagem dos botões do menu"/>
      <p>Botão iniciar jogo: Inicia o jogo.</p>
      <p>Botão menu: Abre as opções do menu. </p>
      <p>Botão som: Ativa e desativa música de fundo.</p>
    </div>
  );
}
function Menu() {
  return (
    <div>
      <img src={imgTelaDificuldade} alt="imagem da escolha da dificuldade"/>
      <p>Botão tutorial: Abre o tutorial do jogo.</p>
      <p>Botão dificuldade: Abre as opções de dificuldade.</p>
    </div>
  );
}
function Dificuldade() {
  return (
    <div>
      <img src={imgTelaDificuldade} alt="Tela de seleção de dificuldade"/>
      <p>Texto informativo: Informa qual dificuldade está ativa.</p>
      <p>Botão fácil: Seleciona dificuldade fácil, operações de soma. </p>
      <p>Botão médio: Seleciona dificuldade médio, operações de soma e subtração.</p>
      <p>Botão difícil: Seleciona dificuldade difícil, operações de soma, subtração e multiplicação. </p>
    </div>
  );
}
function Jogar() {
  return (
    <div>
      <button
        className="button"
      >
        ▶ JOGAR
      </button>
      <img className="pull-right imgSmall" src={imgTelaPausarJogo} alt="imagem da tela do jogo depois do jogo iniciado"/>
      <p>Botão iniciar jogo: Inicia o jogo. </p>
      <p>Cálculo: Mostra valores e tipo de operação.</p>
      <p>Campo resposta: Campo para responder a operação.</p>
      <p>Pontos: Mostra pontuação do jogo.</p>
      <p>Tempo: Mostra tempo do jogo.</p>
      <p>Botão pausar e menu: Pausa o jogo e abre o menu. </p>
    </div>
  );
}
function Pausar() {
  return (
    <div>
      <img className="pull-left inline" src={imgTelaPausarJogo} alt="imagem da tela do jogo antes de pausar jogo"/>
      <img className="pull-right inline" src={imgTelaJogoPausado} alt="imagem da tela do jogo depois do jogo pausado"/>
      <div className="clearfix"></div>
      <p>Botão pausar e menu: Pausa o jogo e abre o menu.</p>
      <p>Botão voltar ao jogo: Tira o jogo do pause.</p>
    </div>
  );
}
function FimJogo() {
  return (
    <div>
      <img src={imgTelaFimJogo} alt="imagem da tela do fim do jogo"/>
      <p>Botão jogar novamente: Abre a tela do jogo.</p>
      <p>Botão tela inicial: Abri a tela inicial do jogo.</p>
      <p>Botão compartilhe sua pontuação: Compartilha pontuação no facebook.</p>
    </div>
  );
}
function Atalhos() {
  return (
    <div>
      <p>Tecla NVDA + Espaço : Alternar entre os modos de foco e de navegação.</p>
      <p>Shift + Tab : Volta no elemento anterior.</p>
    </div>
  );
}
