import React from 'react';
import '../css/tutorial.css';

export default class Tutorial extends React.Component {
  constructor(props) {
    super(props)
    this.tutorials = [
      'Tela inicial',
      'Música e avisos sonoros',
      'Tela do jogo',
      'Menu',
      'Dificuldade',
      'Jogar',
      'Pausar jogo',
      'Tela fim do jogo',
      'Atalhos',
    ]
  }
  render() {
    return (
      <div>
        <header>
          <h1>Tutorial</h1>
        </header>
        <nav>
          <ul id="linksTopicos">
            {this.tutorials.map((tutorial, index) => 
              <li key={index}><button className="clean" title={tutorial}>{tutorial}</button></li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}