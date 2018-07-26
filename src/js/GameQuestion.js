import React from 'react';

export default class GameQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: ''
    }
    this.onAnswer = this.onAnswer.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
    e.stopPropagation();
    console.log('mudou')
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
  componentDidMount () {
    this.nameInput.focus(); 
  }
  renderMath() {
    const { n1, n2, op, opsig } = this.props.question;
    return (
      <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mrow>
          <mn>{n1}</mn>
          <mo>{opsig}</mo>
          <mn>{n2}</mn>
        </mrow>
      </math>
    );
  }
  render() {
    const { n1, n2, op, opsig } = this.props.question;
    return (
      <div id="conta" className="big text-center">      
        <div tabIndex="3" id="conta-valores" role="math" aria-live="assertive" aria-label={`${n1} ${op} ${n2}`}>
          {this.renderMath()}
        </div>
        <form action="#" id="answer-form" onSubmit={this.onAnswer}>
          <input
            role="status"
            tabIndex="4"
            className="small"
            placeholder="digite a resposta"
            type="number"
            value={this.state.answer && parseInt(this.state.answer, 10)}
            onChange={this.onInputChange}
            ref={(input) => { this.nameInput = input; }} 
            disabled={this.props.gameOver || this.props.isPaused}
          />
        </form>
      </div>
    )
  }
}
