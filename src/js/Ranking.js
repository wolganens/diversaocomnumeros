import React from 'react';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }
  componentDidMount() {
    /*Recupera as pontuações e atualiza o estado do componente*/
    if (const scores = JSON.parse(localStorage.getItem('scores'))) {
      this.setState({
        scores
      });
    }
  }
  render() {
    return (
      {this.state.score.length == 0 ? (
        <p className="big">Não há pontuações salvas.</p>
      ) : (
        <ul>
          {this.state.scores.map( score => (
            <li>`${score.name}: ${score.score}`</li>
          ))}
        </ul>
      )}
    );
  }
}