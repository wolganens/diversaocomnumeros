import React from 'react';
import FacebookProvider, { Share } from 'react-facebook';

export default class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onFbShareClick = this.onFbShareClick.bind(this);
  }
  onSaveClick(e) {
    /*Nome do jogador*/
    const name = prompt('Salvar pontuação: \nPor favor, insira o seu nome:');
    /*Objeto com o score do jogador atual*/
    const playerScore = {name, score : this.props.score};
    /*Recupera a string com as pontuações salvas no localStorage*/
    const localScores = localStorage.getItem('scores');
    /*Se não há nenhuma pontuação anterior, cria um vetor de pontuações, apenas
    com a pontuação do jogador atual, converte para string e armazena*/
    let scores;
    if (!localScores) {
      scores = [playerScore];
    } else {
      /*Caso já hajam pontuações salvas, recupera elas e adiciona a pontuação do jogador*/
      scores = JSON.parse(localScores);
      /*Tenta encontrar o jogador nas pontuações já existentes*/  
      const playerScoreIndex = scores.findIndex(score => score.name === playerScore.name);
      if (playerScoreIndex === -1) {
        /*Não encontrou o usuário*/
        /*Adiciona a pontuação do usuário no vetor de pontuações*/
        scores.push(playerScore);
      } else {
        /*Atualiza pontuação do jogador*/
        scores[playerScoreIndex] = playerScore;
      }
    }
    /*Atualiza as pontuações no localStorage do usuário*/
    localStorage.setItem('scores', JSON.stringify(scores));
    alert('Pontuação salva com sucesso!');
    this.props.onExitGame()
  }
  onFbShareClick(e) {
    let FB = window.FB;
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'https://diversao-com-numeros.herokuapp.com/',      
    }, function(response){});
  }
  render() {
    return (
      <section className="quadroJogo text-center text-board">
        <div tabIndex="1" className="grand">Fim do Jogo!</div>
        <div tabIndex="2" className="medium">Sua pontuação foi:</div>
        <div tabIndex="3" className="grand text-center">{this.props.score}</div>
        <button
          onClick={this.props.onStartGame}
          className="button">Jogar novamente
        </button>
        <button
          onClick={this.props.onExitGame}
          className="button">Fechar jogo
        </button>
        <div className="text-center">
          <button
            onClick={this.onSaveClick}
            className="button">Salvar pontuação
          </button>
          <FbShareButton/>
        </div>
      </section>
    );
  }
}

class FbShareButton extends React.Component {
  render() {
    return (
      <FacebookProvider appId="659920747712204">
        <Share href="https://diversao-com-numeros.herokuapp.com">
          <button className="button" type="button">Compartilhar pontuação</button>
        </Share>
      </FacebookProvider>
    );
  }
}