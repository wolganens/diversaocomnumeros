import React from 'react';

export default class GameQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: ''
    }
    this.onAnswer = this.onAnswer.bind(this);    
    this.getOperatorTag = this.getOperatorTag.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.score >= this.props.score;
  }
  onAnswer(answer) {    
    const { n1, n2, opsig} = this.props.question;
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
  renderMath() {
    const { n1, n2, opsig } = this.props.question;    
    return (
      <span role="presentation">
        <span>{n1}</span>
        <span className="absolute left">{opsig}</span>
        <span>{n2}</span>          
      </span>
    );
  }
  render() {
    const { n1, n2, op } = this.props.question;
    return (
      <div>
        <div id="conta" className="big text-center">
          <div id="conta-valores">
            <div tabIndex="3" aria-live="polite" aria-atomic="true" aria-label={`${n1} ${op} ${n2}`}></div>
            {this.renderMath()}
          </div>
          <AnswerInput onAnswer={this.onAnswer}/>
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
    this.correct = this.props.onAnswer(this.state.answer);    
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
