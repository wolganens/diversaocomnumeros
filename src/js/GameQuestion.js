import React from 'react';
import ReactDOM from 'react-dom';
import { CalcFactory } from './Utils';

export default class GameQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: ''
    }
    this.onAnswer = this.onAnswer.bind(this);
    this.getOperatorTag = this.getOperatorTag.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.factory = new CalcFactory();
    this.correctCounter = 0;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.score >= this.props.score;
  }
  onAnswer(answer, question) {
    const { n1, n2, opsig} = question;
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
    if (answer !== '') {
      if (answer === result) {
        this.props.onCorrentAnswer();
        this.correctCounter++;
        return true;
      } else {
        this.props.onIncorrectAnswer();
        return false;
      }
    }
  }
  getOperatorTag(opsig) {
    switch (opsig) {
      case '-':
        return <minus/>;
      case '+':
        return <plus/>;
      case 'x':
        return <times/>;
      default:
        return <plus/>;
    }
  }
  renderMath(n1, n2, opsig) {
    return (
      <span role="presentation">
        <span>{n1}</span>
        <span className="absolute left">{opsig}</span>
        <span>{n2}</span>
      </span>
    );
  }
  render() {
    const question = this.factory.make(this.correctCounter, this.props.level);
    const { n1, n2, op, opsig } = question;

    ReactDOM.render(
        <div id="jogoConta" tabIndex="3" aria-live="polite">{`${n1} ${op} ${n2}`}</div>
    , document.getElementById("contaLabel"))

    return (
      <div>
        <div id="conta" className="big text-center">
          <div aria-hidden="true" id="conta-valores">
            {this.renderMath(n1, n2, opsig)}
          </div>
          <AnswerInput onAnswer={this.onAnswer} question={question}/>
        </div>
      </div>
    )
  }
}

class AnswerInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: ''
    }
    this.correct = true;
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.correct = this.props.onAnswer(this.state.answer, this.props.question);
    this.setState({
      answer: ''
    })
  }
  onInputChange(e) {
    e.preventDefault();
    e.stopPropagation();
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
      <form action="#" id="answer-form" onSubmit={this.onSubmit}>
        <input
          tabIndex="4"
          className={`${!this.correct ? 'shake animated ' : ''} small`}
          placeholder="Digite o resultado da conta"
          type="text"
          value={this.state.answer}
          onChange={this.onInputChange}
          disabled={this.props.gameOver || this.props.isPaused}
        />
        {this.correct = true}
      </form>
    );
  }
}
