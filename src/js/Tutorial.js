import React from 'react';
import imgTelaInicial from '../imgs/telaInicial.PNG';
import '../css/tutorial.css';

function TelaInicial() {
  return (
    <div>
      <img src={imgTelaInicial} alt="imagem da tela inicial"/>
      <p>Botão Tutorial: Abre o tutorial do jogo.</p>
      <p>Botão Jogar: Abre a tela de jogo.</p>
    </div>
  )
}
export default class Tutorial extends React.Component {
  constructor(props) {
    super(props)
    this.tutorials = [
      {
        title: 'Tela inicial',
        view: () => <TelaInicial/>
      },
      {
        title: 'Música e avisos sonoros',
        views : ''
      },
      {
        title: 'Tela do jogo',
        view: ''
      },
      {
        title: 'Menu',
        view: ''
      },
      {
        title: 'Dificuldade',
        view: ''
      },
      {
        title: 'Jogar',
        view: ''
      },
      {
        title: 'Pausar jogo',
        view: ''
      },
      {
        title: 'Tela fim do jogo',
        view: ''
      },
      {
        title: 'Atalhos',
        view: ''
      },
    ]
    this.state = {
      selected: null
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.renderTutorial = this.renderTutorial.bind(this);
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
          <h1>Tutorial</h1>
        </header>
        <nav>
          {this.state.selected == null ? (
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
          ) : (
            <div>              
              {this.renderTutorial()}
            </div>
          )}
        </nav>
      </div>
    );
  }
}