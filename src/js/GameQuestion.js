import React from 'react';

export default class GameQuestion extends React.Component {
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
    const { n1, n2, opsig, op } = this.props.question;
    let result = null;
    switch (opsig) {
      case '+':
        result = n1 + n2;
        break;
      case '-':
        result = n1 - n2;
        break;
      case 'x':
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

    <div id="conta" className="big text-center" >
        <div tabindex="3" id="conta-valores" role="alert" aria-live="assertive" aria-label={this.props.question.n1 + " " + this.props.question.op + " " + this.props.question.n2}>
          <span aria-hidden="true">{this.props.question.n1}</span>
          <span aria-hidden="true"className="absolute left">{this.props.question.opsig}</span>
          <span aria-hidden="true">{this.props.question.n2}</span>
        </div>
        <form action="#" id="answer-form" onSubmit={this.onAnswer}>
          <input
            tabindex="4"
            className="small"
            placeholder="Insira a resposta"
            type="number"
            value={this.state.answer && parseInt(this.state.answer, 10)}
            onChange={this.onInputChange}
            disabled={this.props.gameOver || this.props.isPaused}
          />
        </form>
      </div>
    )
  }
}
