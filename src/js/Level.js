import React from 'react';

export default class Level extends React.Component {
  constructor(props) {
    super(props)
    this.displayLevelText = this.displayLevelText.bind(this);
  }
  displayLevelText() {
    switch (this.props.level) {
      case 1:
        return 'Fácil';
      case 2:
        return 'Médio';
      case 3:
        return 'Difícil';
      case 4:
        return 'Gradual';
      default:
        return 'Gradual'
    }
  }
  render () {
    return (
      <section className="text-board text-center quadroJogo">
        <div tabindex="1" className="medium">A dificuldade atual é: {this.displayLevelText()}</div>
        <div tabindex="2"className="medium">Selecione a dificuldade: </div>
        <div className="btn-group">
          <button onClick={() => {this.props.onChangeLevel(1);this.props.onExitLevel()}} className="button">Fácil</button>
          <button onClick={() => {this.props.onChangeLevel(2);this.props.onExitLevel()}} className="button">Médio</button>
          <button onClick={() => {this.props.onChangeLevel(3);this.props.onExitLevel()}} className="button">Difícil</button>
          <button onClick={() => {this.props.onChangeLevel(4);this.props.onExitLevel()}} className="button">Gradual</button>
          <button onClick={this.props.onExitLevel}className="button">Voltar</button>
        </div>
      </section>
    );
  }
}
